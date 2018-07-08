#! /usr/bin/env node

'use strict'

const yargs = require('yargs')
const hostMaster = require('./src/host-master')
const argv = require('./src/argv')
const { hasParams, handleParams } = require('./src/params')

function main() {
    const hasParam = hasParams(argv)

    if( !hasParam ) {
        hostMaster.showActivedHost()
        yargs.showHelp()
        process.exit()
    }

    handleParams(argv)
}

main()
