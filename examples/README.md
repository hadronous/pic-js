# Examples

All examples are written in [TypeScript](https://www.typescriptlang.org/) with [Jest](https://jestjs.io/) as the test runner,
but `@hadronous/pic` can be used with JavaScript and any other testing runner, such as [NodeJS](https://nodejs.org/dist/latest-v20.x/docs/api/test.html), [bun](https://bun.sh/docs/cli/test) or [Mocha](https://mochajs.org/).

- The [Counter](https://github.com/hadronous/pic-js/tree/main/examples/counter) example demonstrates how to work with the `@hadronous/pic` in the simplest way.
- The [Clock](https://github.com/hadronous/pic-js/tree/main/examples/clock) example demonstrates how to work with the replica time and canister timers with `@hadronous/pic` as well as checking for canister existence and cycle management.

## Setup

- Install [bun](https://bun.sh/)
- Install dependencies:
  ```bash
  bun i
  ```

## [Counter](https://github.com/hadronous/pic-js/tree/main/examples/counter)

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
