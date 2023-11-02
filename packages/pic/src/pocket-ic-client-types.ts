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
