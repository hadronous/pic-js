import { Principal } from '@dfinity/principal';
import { base64Decode, base64Encode, base64EncodePrincipal } from './util';
import { HeadersInit, HttpClient } from './http-client';

export interface CreateInstanceSuccessResponse {
  Created: {
    instance_id: number;
  };
}
export interface CreateInstanceErrorResponse {
  Error: {
    message: string;
  };
}
export type CreateInstanceResponse =
  | CreateInstanceSuccessResponse
  | CreateInstanceErrorResponse;

export interface CanisterCallRequest {
  sender: string;
  canister_id: string;
  method: string;
  payload: string;
}

export interface CanisterCallSuccessResponse {
  Ok: {
    Reply: string;
  };
}

export interface CanisterCallErrorResponse {
  Err: {
    code: string;
    description: string;
  };
}

export type CanisterCallResponse =
  | CanisterCallSuccessResponse
  | CanisterCallErrorResponse;

export interface GetTimeResponse {
  nanos_since_epoch: number;
}

export interface SetTimeRequest {
  nanos_since_epoch: number;
}

export interface CheckCanisterExistsRequest {
  canister_id: string;
}

export interface GetCanisterCyclesBalanceRequest {
  canister_id: string;
}

export interface GetCanisterCyclesBalanceResponse {
  cycles: number;
}

export interface AddCanisterCyclesRequest {
  canister_id: string;
  amount: number;
}

export interface AddCanisterCyclesResponse {
  cycles: number;
}

const PROCESSING_TIME_HEADER = 'processing-timeout-ms';
const PROCESSING_TIME_VALUE_MS = 300_000;

export class PocketIcClient {
  private constructor(private readonly url: string) {}

  public static async create(url: string): Promise<PocketIcClient> {
    const instanceId = await PocketIcClient.createInstance(url);

    return new PocketIcClient(`${url}/instances/${instanceId}`);
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
    await HttpClient.delete(`${this.url}`);
  }

  public async tick(): Promise<void> {
    return await this.post<void, void>('/update/tick');
  }

  public async getTime(): Promise<number> {
    const response = await this.get<GetTimeResponse>('/read/get_time');

    return response.nanos_since_epoch / 1_000_000;
  }

  public async setTime(time: number): Promise<void> {
    await this.post<SetTimeRequest, void>('/update/set_time', {
      nanos_since_epoch: time * 1_000_000,
    });
  }

  public async fetchRootKey(): Promise<ArrayBuffer> {
    return await this.post<null, ArrayBuffer>('/read/root_key');
  }

  public async checkCanisterExists(canisterId: Principal): Promise<boolean> {
    return await this.post<CheckCanisterExistsRequest, boolean>(
      '/read/canister_exists',
      { canister_id: base64EncodePrincipal(canisterId) },
    );
  }

  public async getCyclesBalance(canisterId: Principal): Promise<number> {
    const response = await this.post<
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
    const response = await this.post<
      AddCanisterCyclesRequest,
      AddCanisterCyclesResponse
    >('/update/add_cycles', {
      canister_id: base64EncodePrincipal(canisterId),
      amount,
    });

    return response.cycles;
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

    const response = await this.post<CanisterCallRequest, CanisterCallResponse>(
      endpoint,
      rawCanisterCall,
    );

    if ('Err' in response) {
      throw new Error(response.Err.description);
    }

    return base64Decode(response.Ok.Reply);
  }

  private async post<P, R>(endpoint: string, body?: P): Promise<R> {
    const headers: HeadersInit = {
      [PROCESSING_TIME_HEADER]: PROCESSING_TIME_VALUE_MS.toString(),
    };

    return await HttpClient.post<P, R>(`${this.url}${endpoint}`, {
      body,
      headers,
    });
  }

  private async get<R>(endpoint: string): Promise<R> {
    const headers: HeadersInit = {
      [PROCESSING_TIME_HEADER]: PROCESSING_TIME_VALUE_MS.toString(),
    };

    return await HttpClient.get<R>(`${this.url}${endpoint}`, { headers });
  }
}
