# nodes

[![Build Status][travis-img]][travis-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> Awesome node modules.

## Installation

```shell
$ npm install nodes

# or yarn
$ yarn add nodes
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const nodes = require('nodes')
const result = nodes('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### nodes(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## CLI Usage

<!-- TODO: Introduction of CLI -->

Use npx:

```shell
$ npx nodes <input> [options]
```

Globally install:

```shell
$ npm install nodes -g
# or yarn
$ yarn global add nodes
```

```shell
$ nodes --help
demo v0.1.0

Usage:
  $ nodes <input>

Commands:
  <input>  Sample cli program

For more info, run any command with the `--help` flag:
  $ nodes --help

Options:
  --host <host>  Sample options
  -h, --help     Display this message
  -v, --version  Display version number

Examples:
  $ nodes w --host zce.me
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [Your name](https://github.com/zce/zce/blob/master/bin/zce.js)



[travis-img]: https://img.shields.io/travis/com/zce/nodes
[travis-url]: https://travis-ci.com/zce/nodes
[codecov-img]: https://img.shields.io/codecov/c/github/zce/nodes
[codecov-url]: https://codecov.io/gh/zce/nodes
[license-img]: https://img.shields.io/github/license/zce/nodes
[license-url]: https://github.com/zce/nodes/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/nodes
[downloads-url]: https://npmjs.org/package/nodes
[version-img]: https://img.shields.io/npm/v/nodes
[version-url]: https://npmjs.org/package/nodes
[dependency-img]: https://img.shields.io/david/zce/nodes
[dependency-url]: https://david-dm.org/zce/nodes
[devdependency-img]: https://img.shields.io/david/dev/zce/nodes
[devdependency-url]: https://david-dm.org/zce/nodes?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
