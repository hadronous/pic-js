import { chmodSync, createWriteStream } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMMIT_HASH = '307d5847c1d2fe1f5e19181c7d0fcec23f4658b3';
const IS_LINUX = process.platform === 'linux';
const PLATFORM = IS_LINUX ? 'x86_64-linux' : 'x86_64-darwin';
const DOWNLOAD_HOST = 'download.dfinity.systems';
const DOWNLOAD_PATH = `/ic/${COMMIT_HASH}/openssl-static-binaries/${PLATFORM}/pocket-ic.gz`;

const TARGET_PATH = resolve(__dirname, 'pocket-ic');

async function downloadPicBinary() {
  const response = await fetch(`https://${DOWNLOAD_HOST}${DOWNLOAD_PATH}`);

  await pipeline(response.body, createGunzip(), createWriteStream(TARGET_PATH));

  chmodSync(TARGET_PATH, 0o700);
}

downloadPicBinary();
