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

var cacheOriginContent

function showActivedHost() {
    if(cacheOriginContent){
        hostMaster.showActivedHost(cacheOriginContent)
        return
    }

    fsp.readFile(HOST_PATH).then(fileContent =>{
        hostMaster.showActivedHost(fileContent)
    })
}

function processParams() {
    if (argv.name) { // switch host

        fsp.readFile(HOST_PATH).then(fileContent =>{
            var newContent = hostMaster.activeHost(fileContent, argv.name)

            cacheOriginContent = newContent

            return fsp.writeFile(HOST_PATH, newContent)
        }).then(()=>{
            showActivedHost()
        })

    } else if (argv.l) { // show host list
        fsp.readFile(HOST_PATH).then(fileContent =>{
            cacheOriginContent = fileContent
            hostMaster.listAllHostName(fileContent)
            showActivedHost()
        })
    }
}

// showHelp by if has params
function init() {
    var i,
        noParams = true

    for (i in argv) {
        if (/[_$0]/g.test(i)) {
            continue
        }

        if (argv[i]) {
            noParams = false
            break
        }
    }

    if (noParams) {
        showActivedHost()
        yargs.showHelp()
        return
    }

    processParams()
}

init()