# Clock

This example demonstrates how to work with the replica's system time, canister timers as well as checking for canister existence and cycle management.

Start DFX:

```shell
dfx start --background
```

Create a new canister:

```shell
bun create:clock
```

Build the counter canister:

```shell
bun build:clock
```

Run the counter tests:

```shell
bun test:clock
```
