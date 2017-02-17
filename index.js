#! /usr/bin/env node

'use strict'

var HOST_PATH = '/private/etc/hosts'
var hostMaster = require('./util/core')
var fsp = require('./util/promise-fs.js')
var yargs = require('yargs')
var argv = yargs
    .option('name', {
        type: 'string',
        describe: '[hostName] Switch host by name',
        alias: 'n'
    })
    .option('list', {
        boolean: true,
        default: false,
        describe: 'Show hostName list',
        alias: 'l'
    })
    .example('chost -n localhost', 'now you\'re at localhost')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017')
    .argv

// showHelp by if has params
function checkIsWithoutParams() {
    var i,
        hasNoParams = true

    for (i in argv) {
        if (/[_$0]/g.test(i)) {
            continue
        }

        if (argv[i]) {
            hasNoParams = false
            break
        }
    }

    if (hasNoParams) {
        yargs.showHelp()
        process.exit() // exit(1) is error
    }
}

function processParams() {
    if (argv.name) { // switch host

        fsp.readFile(HOST_PATH).then(fileContent =>{
            var newContent = hostMaster.activeHost(fileContent, argv.name);

            return fsp.writeFile(HOST_PATH, newContent)
        }).then(()=>{
            showCurrentHost()
        })

    } else if (argv.l) { // show host list
        fsp.readFile(HOST_PATH).then(fileContent =>{
            hostMaster.listAllHostName(fileContent, argv.name)
            showCurrentHost()
        })
        
    }
}

//TODO: before exit show the current hostname
function showCurrentHost() {
    console.log('TODO: You\' at', hostMaster.getCurrentHostName(),'now!')
}

checkIsWithoutParams()
processParams()
