import { Principal } from '@dfinity/principal';
import { base64Decode, base64Encode, base64EncodePrincipal } from './util';
import { HeadersInit, HttpClient, ResponseRead } from './http-client';
import {
  AddCanisterCyclesRequest,
  AddCanisterCyclesResponse,
  CanisterCallRequest,
  CanisterCallResponse,
  CheckCanisterExistsRequest,
  CreateInstanceResponse,
  GetCanisterCyclesBalanceRequest,
  GetCanisterCyclesBalanceResponse,
  GetStableMemoryRequest,
  GetStableMemoryResponse,
  GetTimeResponse,
  SetStableMemoryRequest,
  SetTimeRequest,
} from './pocket-ic-client-types';

const PROCESSING_TIME_HEADER = 'processing-timeout-ms';
const PROCESSING_TIME_VALUE_MS = 300_000;

export class PocketIcClient {
  private constructor(
    private readonly instanceUrl: string,
    private readonly serverUrl: string,
  ) {}

  public static async create(url: string): Promise<PocketIcClient> {
    const instanceId = await PocketIcClient.createInstance(url);

    return new PocketIcClient(`${url}/instances/${instanceId}`, url);
  }

  private static async createInstance(url: string): Promise<number> {
    const response = await HttpClient.post<null, CreateInstanceResponse>(
      `${url}/instances`,
    );

    if ('Error' in response) {
      throw new Error(response.Error.message);
    }

    return response.Created.instance_id;
  }

  public async deleteInstance(): Promise<void> {
    await HttpClient.delete(`${this.instanceUrl}`);
  }

  public async tick(): Promise<void> {
    return await this.instancePost<void, void>('/update/tick');
  }

  public async getTime(): Promise<number> {
    const response = await this.instanceGet<GetTimeResponse>('/read/get_time');

    return response.nanos_since_epoch / 1_000_000;
  }

  public async setTime(time: number): Promise<void> {
    await this.instancePost<SetTimeRequest, void>('/update/set_time', {
      nanos_since_epoch: time * 1_000_000,
    });
  }

  public async fetchRootKey(): Promise<ArrayBuffer> {
    return await this.instancePost<null, ArrayBuffer>('/read/root_key');
  }

  public async checkCanisterExists(canisterId: Principal): Promise<boolean> {
    return await this.instancePost<CheckCanisterExistsRequest, boolean>(
      '/read/canister_exists',
      { canister_id: base64EncodePrincipal(canisterId) },
    );
  }

  public async getCyclesBalance(canisterId: Principal): Promise<number> {
    const response = await this.instancePost<
      GetCanisterCyclesBalanceRequest,
      GetCanisterCyclesBalanceResponse
    >('/read/get_cycles', {
      canister_id: base64EncodePrincipal(canisterId),
    });

    return response.cycles;
  }

  public async addCycles(
    canisterId: Principal,
    amount: number,
  ): Promise<number> {
    const response = await this.instancePost<
      AddCanisterCyclesRequest,
      AddCanisterCyclesResponse
    >('/update/add_cycles', {
      canister_id: base64EncodePrincipal(canisterId),
      amount,
    });

    return response.cycles;
  }

  public async uploadBlob(blob: Uint8Array): Promise<Uint8Array> {
    const response = await this.serverPost<Uint8Array, string>(
      '/blobstore',
      blob,
      'text',
    );

    const hex = Buffer.from(response, 'hex');

    return new Uint8Array(hex);
  }

  public async setStableMemory(
    canisterId: Principal,
    blobId: Uint8Array,
  ): Promise<void> {
    await this.instancePost<SetStableMemoryRequest, void>(
      '/update/set_stable_memory',
      {
        canister_id: base64EncodePrincipal(canisterId),
        blob_id: Array.from(blobId),
      },
      'none',
    );
  }

  public async getStableMemory(canisterId: Principal): Promise<Uint8Array> {
    const response = await this.instancePost<
      GetStableMemoryRequest,
      GetStableMemoryResponse
    >('/read/get_stable_memory', {
      canister_id: base64EncodePrincipal(canisterId),
    });

    return response.blob;
  }

  public async updateCall(
    canisterId: Principal,
    sender: Principal,
    method: string,
    payload: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return await this.canisterCall(
      '/update/execute_ingress_message',
      canisterId,
      sender,
      method,
      payload,
    );
  }

  public async queryCall(
    canisterId: Principal,
    sender: Principal,
    method: string,
    payload: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return await this.canisterCall(
      '/read/query',
      canisterId,
      sender,
      method,
      payload,
    );
  }

  private async canisterCall(
    endpoint: string,
    canisterId: Principal,
    sender: Principal,
    method: string,
    payload: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    let rawCanisterCall: CanisterCallRequest = {
      sender: base64EncodePrincipal(sender),
      canister_id: base64EncodePrincipal(canisterId),
      method,
      payload: base64Encode(payload),
    };

    const response = await this.instancePost<
      CanisterCallRequest,
      CanisterCallResponse
    >(endpoint, rawCanisterCall);

    if ('Err' in response) {
      throw new Error(response.Err.description);
    }

    return base64Decode(response.Ok.Reply);
  }

  private async instancePost<P, R>(
    endpoint: string,
    body?: P,
    read?: ResponseRead,
  ): Promise<R> {
    const headers: HeadersInit = {
      [PROCESSING_TIME_HEADER]: PROCESSING_TIME_VALUE_MS.toString(),
    };

    return await HttpClient.post<P, R>(`${this.instanceUrl}${endpoint}`, {
      body,
      headers,
      read,
    });
  }

  private async serverPost<P, R>(
    endpoint: string,
    body?: P,
    read?: ResponseRead,
  ): Promise<R> {
    return await HttpClient.post<P, R>(`${this.serverUrl}${endpoint}`, {
      body,
      read,
    });
  }

  private async instanceGet<R>(endpoint: string): Promise<R> {
    const headers: HeadersInit = {
      [PROCESSING_TIME_HEADER]: PROCESSING_TIME_VALUE_MS.toString(),
    };

    return await HttpClient.get<R>(`${this.instanceUrl}${endpoint}`, {
      headers,
    });
  }
}
