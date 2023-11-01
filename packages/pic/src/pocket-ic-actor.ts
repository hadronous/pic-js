import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { PocketIcClient } from './pocket-ic-client';

/**
 * Typesafe method of a canister.
 *
 * @category Types
 */
export interface ActorMethod<
  Args extends unknown[] = unknown[],
  Ret = unknown,
> {
  (...args: Args): Promise<Ret>;
}

/**
 * Candid interface of a canister.
 *
 * @category Types
 */
export type ActorInterface = Record<string, ActorMethod>;

/**
 * Typesafe class that implements the Candid interface of a canister.
 *
 * @category Types
 */
export type Actor<T = ActorInterface> = T & {
  new (): Actor<T>;
  setSender(identity: Principal): void;
};

export function createActorClass<T = ActorInterface>(
  interfaceFactory: IDL.InterfaceFactory,
  canisterId: Principal,
  pocketIcClient: PocketIcClient,
): Actor<T> {
  const service = interfaceFactory({ IDL });
  let sender: Principal | null = null;

  function decodeReturnValue(types: IDL.Type[], msg: ArrayBufferLike) {
    const returnValues = IDL.decode(types, msg as ArrayBuffer);

    switch (returnValues.length) {
      case 0:
        return undefined;
      case 1:
        return returnValues[0];
      default:
        return returnValues;
    }
  }

  function createActorMethod(
    methodName: string,
    func: IDL.FuncClass,
  ): ActorMethod {
    if (
      func.annotations.includes('query') ||
      func.annotations.includes('composite_query')
    ) {
      return createQueryMethod(methodName, func);
    }

    return createCallMethod(methodName, func);
  }

  function getSender(): Principal {
    return sender ?? Principal.anonymous();
  }

  function createQueryMethod(
    methodName: string,
    func: IDL.FuncClass,
  ): ActorMethod {
    return async function (...args) {
      const arg = IDL.encode(func.argTypes, args);
      const sender = getSender();

      const response = await pocketIcClient.queryCall(
        canisterId,
        sender,
        methodName,
        arg,
      );

      return decodeReturnValue(func.retTypes, response);
    };
  }

  function createCallMethod(
    methodName: string,
    func: IDL.FuncClass,
  ): ActorMethod {
    return async function (...args) {
      const arg = IDL.encode(func.argTypes, args);
      const sender = getSender();

      const response = await pocketIcClient.updateCall(
        canisterId,
        sender,
        methodName,
        arg,
      );

      return decodeReturnValue(func.retTypes, response);
    };
  }

  function Actor() {}

  Actor.prototype.setSender = function (newSender: Principal): void {
    sender = newSender;
  };

  service._fields.forEach(([methodName, func]) => {
    Actor.prototype[methodName] = createActorMethod(methodName, func);
  });

  return Actor as Actor<T>;
}
