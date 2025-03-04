# Pic JS

Pic JS is a library for interacting with a local instance of `pocket-ic` from TypeScript.

The `pocket-ic` is a canister testing platform for the [Internet Computer](https://internetcomputer.org/). It is a standalone executable that can be used to test canisters locally, without the need to deploy them to a full replica.

Other languages available include [Python](https://github.com/dfinity/pocketic-py/) and [Rust](https://github.com/dfinity/ic/tree/master/packages/pocket-ic).

## Installation

```shell
npm i -D @hadronous/pic
```

Install peer dependencies if they are not already installed:

```shell
npm i -D @dfinity/{agent,candid,identity,principal}
```

## Usage

The easiest way to use PocketIC is to use `setupCanister` convenience method:

```ts
import { PocketIc } from '@hadronous/pic';
import { _SERVICE, idlFactory } from '../declarations';

const wasmPath = resolve('..', '..', 'canister.wasm');

const pic = await PocketIc.create();
const fixture = await pic.setupCanister<_SERVICE>(idlFactory, wasmPath);
const { actor } = fixture;

// perform tests...

await pic.tearDown();
```

If more control is needed, then the `createCanister`, `installCode` and `createActor` methods can be used directly:

```ts
import { PocketIc } from '@hadronous/pic';
import { _SERVICE, idlFactory } from '../declarations';

const wasmPath = resolve('..', '..', 'canister.wasm');

const pic = await PocketIc.create();

const canisterId = await pic.createCanister();
await pic.installCode(canisterId, wasmPath);
const actor = pic.createActor<_SERVICE>(idlFactory, canisterId);

// perform tests...

await pic.tearDown();
```

## Documentation

More detailed documentation is available over at [hadronous.github.io/pic-js](https://hadronous.github.io/pic-js/).

## Examples

All examples are written in [TypeScript](https://www.typescriptlang.org/) with [Jest](https://jestjs.io/) as the test runner,
but `@hadronous/pic` can be used with JavaScript and any other testing runner, such as [NodeJS](https://nodejs.org/dist/latest-v20.x/docs/api/test.html), [bun](https://bun.sh/docs/cli/test) or [Mocha](https://mochajs.org/).

- The [Counter](https://github.com/hadronous/pic-js/tree/main/examples/counter/README.md) example demonstrates how to work with a simple canister as well as init arguments, canister upgrades and WASM reinstallation.
- The [Clock](https://github.com/hadronous/pic-js/tree/main/examples/clock/README.md) example demonstrates how to work with the replica's system time, canister timers as well as checking for canister existence and cycle management.
- The [Todo](https://github.com/hadronous/pic-js/tree/main/examples/todo/README.md) example demonstrates how to work with more complex canisters, identities, canister upgrades, and stable memory management.
- The [Multicanister](https://github.com/hadronous/pic-js/tree/main/examples/multicanister/README.md) example demonstrates how to work with multiple canisters and multiple subnets.
- The [NNS Proxy](https://github.com/hadronous/pic-js/tree/main/examples/nns_proxy/README.md) example demonstrates how to work with an NNS state directory.
- [Google Search](https://github.com/hadronous/pic-js/tree/main/examples/google_search/README.md) example demonstrates how to mock HTTPS Outcalls.
