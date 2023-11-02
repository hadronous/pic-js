export class PlatformMismatchError extends Error {
  constructor() {
    super(
      `The PocketIC binary is only available for x64 Linux and Intel/rosetta-enabled Darwin, but you are running ${process.platform} ${process.arch}.`,
    );
  }
}

export class BinNotFoundError extends Error {
  constructor(picBinPath: string) {
    super(
      `Could not find the PocketIC binary. The PocketIC binary could not be found at ${picBinPath}. Please try install @hadronous/pic again.`,
    );
  }
}

export class BinTimeoutError extends Error {
  constructor() {
    super('The PocketIC binary took too long to start. Please try again.');
  }
}
