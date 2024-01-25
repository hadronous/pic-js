## Unreleased

### Feat

- accept ArrayBufferLike instead of Uint8Array to be more compatible with agent-js & co libraries
- throw a more helpful error is devs interact with a pic instance after tearing it down
- add ability to tick multiple times

### Refactor

- use auto-generated idl for management canister

## 0.2.1 (2024-01-21)

## 0.2.1-b2 (2024-01-11)

### Feat

- update versions of @dfinity dependencies

## 0.2.1-b1 (2024-01-07)

### Fix

- update file permission for pocket-ic executable in case package manager has moved it

## 0.2.1-b0 (2023-12-14)

### Fix

- client refuses to start on MacOS ARM chips that are also running NodeJS on ARM architecture

## 0.2.0 (2023-11-06)

## 0.2.0-b3 (2023-11-06)

### Fix

- set processing time header on set_stable_memory header
- get stable memory function returning incorrect type

## 0.2.0-b2 (2023-11-03)

### Feat

- add functions to get and set stable memory

## 0.2.0-b1 (2023-11-02)

### Feat

- add canister code management functions

## 0.2.0-b0 (2023-11-02)

### Feat

- add deterministic and random identity generation functions
- add method to set identity on actor

## 0.1.0 (2023-11-02)

### Feat

- include pic binary in package using postinstall script
- initial commit
