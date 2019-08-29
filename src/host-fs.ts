import { HOST_PATH } from './constant';
import { readFile, writeFile } from '../util/promise-fs';

export default {
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

    readAndWrite(handle) {
        return this.readHost().then(content => {
            return handle(content)
        }).then(newContent => {
            return this.writeHost(newContent)
        })
    }
}
