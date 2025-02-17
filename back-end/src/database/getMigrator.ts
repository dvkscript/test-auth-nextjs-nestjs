import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as path from 'path';
import { DB_URI } from '../config/db.config';

const migrationTableName = 'migration';

export async function getMigrator() {
  const pool = await createPool(DB_URI);

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName,
    slonik: pool,
  } as any);

  return { pool, migrator, migrationTableName };
}
