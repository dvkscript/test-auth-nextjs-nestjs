import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as path from 'path';
import { postgresConnectionUri } from '../config/db.config';

const migrationTableName = 'migration';

export async function getMigrator() {
  const pool = await createPool(postgresConnectionUri);

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName,
    slonik: pool,
  } as any);

  return { pool, migrator, migrationTableName };
}
