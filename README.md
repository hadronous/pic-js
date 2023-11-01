# Pic JS

Pic JS is a library for interacting with a local instance of `pocket-ic` from TypeScript.

The `pocket-ic` is a canister testing platform for the [Internet Computer](https://internetcomputer.org/). It is a standalone executable that can be used to test canisters locally, without the need to deploy them to a full replica.

Other languages available include [Python](https://github.com/dfinity/pocketic-py/) and [Rust](https://github.com/dfinity/ic/tree/master/packages/pocket-ic).

## API Docs

More detailed documentation is available in the [API docs](https://hadronous.github.io/pic-js/).

## Initial Setup

Install dependencies:

```bash
bun i
```

## Examples

### [Counter](https://github.com/hadronous/pic-js/tree/main/examples/counter)

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

### [Clock](https://github.com/hadronous/pic-js/tree/main/examples/clock)

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
