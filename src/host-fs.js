const { HOST_PATH } = require('./constant')
const { readFile, writeFile } = require('../util/promise-fs')

module.exports = {
    readHost() {
        return new Promise(resolve => {
            readFile(HOST_PATH).then(fileContent => resolve(fileContent))
        })
    },
    writeHost(newContent) {
        return new Promise(resolve => {
            writeFile(HOST_PATH, newContent).then(fileContent => resolve(fileContent))
        })
    },
}
