import { resolve } from 'node:path';

await Bun.build({
  entrypoints: [resolve(import.meta.dir, 'src', 'index.ts')],
  outdir: resolve(import.meta.dir, 'dist'),
  target: 'node',
  format: 'esm',
  splitting: true,
  sourcemap: 'external',
  minify: false,
  external: ['@dfinity/candid', '@dfinity/principal'],
});
