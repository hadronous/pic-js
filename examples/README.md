# Examples

All examples are written in [TypeScript](https://www.typescriptlang.org/) with [Jest](https://jestjs.io/) as the test runner,
but `@hadronous/pic` can be used with JavaScript and any other testing runner, such as [NodeJS](https://nodejs.org/dist/latest-v20.x/docs/api/test.html), [bun](https://bun.sh/docs/cli/test) or [Mocha](https://mochajs.org/).

## Setup

- Install [bun](https://bun.sh/)
- Install dependencies:
  ```bash
  bun i
  ```

## [Counter](https://github.com/hadronous/pic-js/tree/main/examples/counter)

This example demonstrates how to work with a simple canister as well as canister upgrades and WASM reinstallation.

Start DFX:

```shell
dfx start --background
```

Create a new canister:

```shell
dfx canister create counter
```

Build the counter canister:

```shell
bun build:counter
```

Run the counter tests:

```shell
bun test:counter
```

## [Clock](https://github.com/hadronous/pic-js/tree/main/examples/clock)

This example demonstrates how to work with the replica's system time, canister timers as well as checking for canister existence and cycle management.

Start DFX:

```shell
dfx start --background
```

Create a new canister:

```shell
dfx canister create clock
```

Build the counter canister:

```shell
bun build:clock
```

Run the counter tests:

```shell
bun test:clock
```
