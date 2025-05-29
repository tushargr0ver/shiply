import * as fs from 'fs'
import * as path from 'path'

function getAllFiles(dir: string) {

    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(dir);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(dir, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;

}

export default getAllFiles