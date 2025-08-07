import fs from 'fs';
import path from 'path';
const arr = ["/home/danil/sms-it-testovoe"];
const res = new Map();



function readDir(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                console.log(`Папка: ${filePath}`)
                arr.push(filePath);
            } else if (stat.isFile()) {
                console.log(`Файл: ${filePath}`)
                if (filePath.endsWith(".js")) {
                    res.set(dirPath, res.get(dirPath) == undefined ? 1 : res.get(dirPath) + 1);
                }

            }
        });
    } catch (err) {
        console.log(`Ошибка при чтении директории: ${err}`);
    }
};

for (let i = 0; i < arr.length; i++) {
    readDir(arr[i]);
}


/*
console.log("##############################################################################")
console.log("##############################################################################")
console.log("##############################################################################")
for (let entry of res) {
    console.log(entry);
}
*/
