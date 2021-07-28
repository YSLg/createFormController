#!/usr/bin/env node

const cac = require('cac')
const nodes = require('..')
const { name, version } = require('../package')

// Unified error handling
/* istanbul ignore next */
const onError = err => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

const cli = cac(name)

// TODO: Implement module cli

cli
  .command('<input>', 'Sample cli program')
  .option('--host <host>', 'Sample options')
  .example(`  $ nodes w --host zce.me`)
  .action((input, options) => {
    console.log(nodes(input, options))
  })

cli.help().version(version).parse()
