import * as fs from 'fs'

export function readFile(filePath) {
    return new Promise(resolve =>{
        fs.readFile(filePath, 'utf-8', function(err, content) {
            if (err) throw err

            resolve(content)
        })
    })
}

export function writeFile(filePath, content) {
    return new Promise(resolve => {
        fs.writeFile(filePath, content, 'utf-8', function(err) {
            if (err) throw err
            resolve()
        })
    })
}
