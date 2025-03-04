## Unreleased

## 0.11.0 (2025-01-01)

### Feat

- update dependencies
- add support for mocking https outcalls
- upgrade to server v6
- upgrade pic server to v5
- upgrade to pic server v4
- add http2 support
- add logging support
- separate pic server management from instance management
- enable direct canister calls
- add support for nns subnet init
- update agent-js and pocket-ic dependencies
- add canister stop and start methods
- add update canister settings method
- upgrade to pocket-ic v3
- upgrade to pic server 2.0.1
- accept ArrayBufferLike instead of Uint8Array to be more compatible with agent-js & co libraries
- throw a more helpful error is devs interact with a pic instance after tearing it down
- add ability to tick multiple times
- update versions of @dfinity dependencies
- add functions to get and set stable memory
- add canister code management functions
- add deterministic and random identity generation functions
- add method to set identity on actor
- include pic binary in package using postinstall script
- initial commit

### Fix

- pipe unwanted logs to /dev/null
- get pub key endpoint params encoded incorrectly
- unable to start picjs server on macos
- build docs only when release_latest is successful
- move docs build and deployment to release workflow
- removed fetchRootKey in favor of getPubKey, which accepts a subnet Id
- canister settings encoding
- propogate sender principal correctly when setting up canister
- updated dependencies on dfinity packages
- updated dependencies on dfinity packages
- update file permission for pocket-ic executable in case package manager has moved it
- client refuses to start on MacOS ARM chips that are also running NodeJS on ARM architecture
- set processing time header on set_stable_memory header
- get stable memory function returning incorrect type

### Refactor

- use auto-generated idl for management canister
