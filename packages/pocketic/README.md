# Pocket IC

`@dintegral/pocketic` is a library for interacting with a local instance of `pocket-ic` from TypeScript.

The `pocket-ic` is a canister testing platform for the [Internet Computer](https://internetcomputer.org/). It is a standalone executable that can be used to test canisters locally, without the need to deploy them to a full replica.

Other languages available include [Python](https://github.com/dfinity/pocketic-py/) and [Rust](https://github.com/dfinity/ic/tree/master/packages/pocket-ic).

## Installation

```shell
npm i -D @dintegral/pocketic
```

## Usage

The easist way to use PocketIC is to use `setupCanister` convenience method:

```ts
import { PocketIc } from '@dintegral/pocketic';
import { _SERVICE, idlFactory } from '../declarations';

const wasmPath = resolve('..', '..', 'canister.wasm');

const pic = await PocketIc.create();
const actor = await pic.setupCanister<_SERVICE>(idlFactory, wasmPath);

// perform tests...

await pic.tearDown();
```

If more control is needed, then the `createCanister`, `installCode` and `createActor` methods can be used directly:

```ts
import { PocketIc } from '@dintegral/pocketic';
import { _SERVICE, idlFactory } from '../declarations';

const wasmPath = resolve('..', '..', 'canister.wasm');

const pic = await PocketIc.create();

const canisterId = await pic.createCanister();
await pic.installCode(canisterId, wasmPath);
const actor = pic.createActor<_SERVICE>(idlFactory, canisterId);

// perform tests...

await pic.tearDown();
```

## API Docs

More detailed documentation is available in the [API docs](#).

## Examples

All examples are written in [TypeScript](https://www.typescriptlang.org/) with [Jest](https://jestjs.io/) as the test runner,
but `@dintegral/pocketic` can be used with JavaScript and any other testing runner, such as [NodeJS](https://nodejs.org/dist/latest-v20.x/docs/api/test.html), [bun](https://bun.sh/docs/cli/test) or [Mocha](https://mochajs.org/).

- The [Counter](#) example demonstrates how to work with the `@dintegral/pocketic` in the simplest way.
- The [Clock](#) example demonstrates how to work with the replica time and canister timers with `@dintegral/pocketic` as well as checking for canister existence and cycle management.
