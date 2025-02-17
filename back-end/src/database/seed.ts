import { getMigrator } from './getMigrator';
import * as fs from 'fs';
import * as path from 'path';


const SALT_ROUNDS = 10; // Số vòng mã hóa của bcrypt

async function hashSensitiveValues(sql: string): Promise<string> {
    const hashRegex = /\$hash\((.*?)\)/g; // Regex tìm tất cả `$hash(giá_trị)`
    const matches = [...sql.matchAll(hashRegex)];
    const bcrypt = await import('bcryptjs');

    for (const match of matches) {
        const originalValue = match[1].trim(); // Lấy giá trị bên trong `$hash()`
        const hashedValue = bcrypt.hashSync(originalValue, SALT_ROUNDS);
        sql = sql.replace(match[0], `${hashedValue}`); // Thay thế vào SQL
    }

    return sql;
}

export const seed = async (query, file) => {
    console.log(`executing migration: ${file} ...`);
    const { pool } = await getMigrator();
    query.sql = await hashSensitiveValues(query.sql);
    await pool.query(query);
    console.log(`${file} migration executed`);
};

const directoryPath = path.join(__dirname, 'seeders');
async function runAll() {
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        for (const file of files) {
            const data = fs.readFileSync(path.resolve(directoryPath, file), {
                encoding: 'utf8',
                flag: 'r',
            });
            await seed({ sql: data, values: [], type: 'SLONIK_TOKEN_SQL' }, file);
        }
        console.log('done');
        process.exit(0);
    });
}

runAll();
