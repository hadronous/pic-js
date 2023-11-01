import { Principal } from '@dfinity/principal';

export function base64Encode(payload: ArrayBuffer): string {
  return Buffer.from(payload).toString('base64');
}

export function base64EncodePrincipal(principal: Principal): string {
  return base64Encode(toArrayBuffer(principal.toUint8Array()));
}

export function base64Decode(payload: string): ArrayBuffer {
  return toArrayBuffer(Buffer.from(payload, 'base64'));
}

export function toArrayBuffer(buffer: Buffer | Uint8Array): ArrayBuffer {
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );

  if (arrayBuffer instanceof SharedArrayBuffer) {
    throw new Error('Expected ArrayBuffer, found SharedArrayBuffer');
  }

  return arrayBuffer;
}
