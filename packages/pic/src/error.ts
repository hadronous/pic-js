import { isLinux } from './util';

export class PlatformMismatchError extends Error {
  constructor() {
    super(
      `The PocketIC binary is only available for x64 Linux and Intel/rosetta-enabled Darwin, but you are running ${process.platform} ${process.arch}.`,
    );
  }
}

export class BinNotFoundError extends Error {
  constructor(picBinPath: string) {
    const currentWorkingDirectory = process.cwd();
    const platform = isLinux() ? 'x86_64-linux' : 'x86_64-darwin';

    super(
      `Could not find the PocketIC binary.

The PocketIC binary could not be found at ${picBinPath}. Please specify the path to the binary with the POCKET_IC_BIN environment variable, \
or place it in your current working directory (you are running PocketIC from ${currentWorkingDirectory}).

Run the following commands to get the binary:
  curl -sLO https://download.dfinity.systems/ic/307d5847c1d2fe1f5e19181c7d0fcec23f4658b3/openssl-static-binaries/${platform}/pocket-ic.gz
  gzip -d pocket-ic.gz
  chmod +x pocket-ic`,
    );
  }
}

export class BinTimeoutError extends Error {
  constructor() {
    super('The PocketIC binary took too long to start. Please try again.');
  }
}
