# Pic JS

[![NPM](https://badge.fury.io/js/@hadronous%2Fpic.svg)](https://badge.fury.io/js/@hadronous%2Fpic)
![Dependencies](https://img.shields.io/librariesio/release/npm/%40hadronous/pic)

[![Test (NodeJS)](https://github.com/hadronous/pic-js/actions/workflows/test-nodejs.yml/badge.svg)](https://github.com/hadronous/pic-js/actions/workflows/test-nodejs.yml)
[![Test (Bun)](https://github.com/hadronous/pic-js/actions/workflows/test-bun.yml/badge.svg)](https://github.com/hadronous/pic-js/actions/workflows/test-bun.yml)
[![Lint](https://github.com/hadronous/pic-js/actions/workflows/lint.yml/badge.svg)](https://github.com/hadronous/pic-js/actions/workflows/lint.yml)
[![CodeQL](https://github.com/hadronous/pic-js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/hadronous/pic-js/actions/workflows/github-code-scanning/codeql)

## Project Maintenance

This project is currently moving to the DFINITY organization and will soon be available at [dfinity/pic-js](https://github.com/dfinity/pic-js).

## Overview

Pic JS is a library for interacting with a local instance of `pocket-ic` from TypeScript.

The `pocket-ic` is a canister testing platform for the [Internet Computer](https://internetcomputer.org/). It is a standalone executable that can be used to test canisters locally, without the need to deploy them to a full replica.

Other languages available include [Python](https://github.com/dfinity/pocketic-py/) and [Rust](https://github.com/dfinity/ic/tree/master/packages/pocket-ic).

## API Docs

More detailed documentation is available in the [API docs](https://hadronous.github.io/pic-js/).

## Examples

Examples are available in the [examples](./examples/README.md) directory.

## Contributing

### Setup

- Install [bun](https://bun.sh/)
- Install [commitizen](https://commitizen-tools.github.io/commitizen/)
- Install [pre-commit](https://pre-commit.com/)
- Install dependencies:
  ```bash
  bun i
  ```
