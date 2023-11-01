import { PlatformMismatchError } from '../error';

export function is64Bit(): boolean {
  return process.arch === 'x64';
}

export function isLinux(): boolean {
  return process.platform === 'linux';
}

export function isDarwin(): boolean {
  return process.platform === 'darwin';
}

function isCorrectPlatform(): boolean {
  return is64Bit() && (isLinux() || isDarwin());
}

export function assertPlatform() {
  if (!isCorrectPlatform()) {
    throw new PlatformMismatchError();
  }
}
