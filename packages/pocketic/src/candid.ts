import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export const CanisterSettings = IDL.Opt(
  IDL.Record({
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    compute_allocation: IDL.Nat,
    memory_allocation: IDL.Nat,
    freezing_threshold: IDL.Nat,
  }),
);

const ProvisionalCreateCanisterWithCyclesRequest = IDL.Record({
  settings: CanisterSettings,
  amount: IDL.Opt(IDL.Nat),
});

export interface CanisterSettings {
  controllers: Principal[];
  compute_allocation: [] | [bigint];
  memory_allocation: [] | [bigint];
  freezing_threshold: [] | [bigint];
}

export interface ProvisionalCreateCanisterWithCyclesRequest {
  settings: [] | [CanisterSettings];
  amount: [] | [bigint];
}

export function encodeCreateCanisterWithRequest(
  arg: ProvisionalCreateCanisterWithCyclesRequest,
): ArrayBuffer {
  return IDL.encode([ProvisionalCreateCanisterWithCyclesRequest], [arg]);
}

const ProvisionalCreateCanisterWithCyclesResponse = IDL.Record({
  canister_id: IDL.Principal,
});

export interface ProvisionalCreateCanisterWithCyclesResponse {
  canister_id: Principal;
}

export function decodeCreateCanisterResponse(
  arg: ArrayBuffer,
): ProvisionalCreateCanisterWithCyclesResponse {
  const [payload] = IDL.decode(
    [ProvisionalCreateCanisterWithCyclesResponse],
    arg,
  );

  // [TODO] - type check?
  return payload as unknown as ProvisionalCreateCanisterWithCyclesResponse;
}

const InstallCodeRequest = IDL.Record({
  arg: IDL.Vec(IDL.Nat8),
  wasm_module: IDL.Vec(IDL.Nat8),
  mode: IDL.Variant({
    reinstall: IDL.Null,
    upgrade: IDL.Null,
    install: IDL.Null,
  }),
  canister_id: IDL.Principal,
});

export interface InstallCodeRequest {
  arg: Uint8Array;
  wasm_module: Uint8Array;
  mode: { reinstall?: null; upgrade?: null; install?: null };
  canister_id: Principal;
}

export function encodeInstallCodeRequest(arg: InstallCodeRequest): ArrayBuffer {
  return IDL.encode([InstallCodeRequest], [arg]);
}
