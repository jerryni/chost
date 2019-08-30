#! /usr/bin/env node

'use strict'

import * as yargs from 'yargs'
import hostMaster from './src/host-master'
import argv from './src/argv'
import { hasParams, handleParams } from './src/params'

async function main() {
    const hasParam = hasParams(argv)

    if( !hasParam ) {
        hostMaster.showActivedHost('')
        yargs.showHelp()
        process.exit()
    }

    await handleParams(argv)
}

main();

export {};
