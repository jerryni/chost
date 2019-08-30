import { HOST_PATH } from './constant';
import { readFile, writeFile } from '../util/promise-fs';

export default {
    readHost(): Promise<string> {
        return new Promise(resolve => {
            readFile(HOST_PATH).then((fileContent:string) => resolve(fileContent))
        })
    },
    writeHost(newContent) {
        return new Promise(resolve => {
            writeFile(HOST_PATH, newContent).then(fileContent => resolve(fileContent))
        })
    }
}
