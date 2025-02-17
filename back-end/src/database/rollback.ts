import { sql } from 'slonik';
import { getMigrator } from './getMigrator';
import * as path from 'path';
import * as fs from 'fs';

const directoryPath = path.join(__dirname, 'migrations/down');

export const rollback = async (query, file, lastMigration) => {
    console.log(`drop table: ${file} ...`);
    const { pool, migrationTableName } = await getMigrator();
    try {
        await pool.transaction(async (trx) => {
            await trx.query(sql.unsafe`
                DELETE FROM ${sql.identifier([migrationTableName])} WHERE name = ${lastMigration};
            `);

            await trx.query(query);

            console.log(`✅ ${file} rollback executed`);
        });
    } catch (error) {
        console.error(`❌ Rollback failed for ${file}:`, error);
    }
};

export async function run() {
    const { pool, migrationTableName } = await getMigrator();

    const lastMigration = await pool.oneFirst(
        sql.unsafe`SELECT name FROM ${sql.identifier([migrationTableName])} ORDER BY date DESC LIMIT 1`
    );

    if (lastMigration) {
        fs.readdir(directoryPath, async function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            const targetFile = files.find((file) => file === lastMigration);

            if (!targetFile) {
                console.log(`⚠️ Không tìm thấy file nào khớp với "${lastMigration}"`);
                return;
            }

            const filePath = path.resolve(directoryPath, targetFile);
            const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

            await rollback({ sql: data, values: [], type: 'SLONIK_TOKEN_SQL' }, targetFile, lastMigration);
            console.log('done');
            process.exit(0);
        });
    } else {
        console.log("No migration found.");
    }
}

run();
