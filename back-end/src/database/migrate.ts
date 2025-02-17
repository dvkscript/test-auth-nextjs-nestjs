import { getMigrator } from './getMigrator';

export async function run() {
  const { migrator } = await getMigrator();
  migrator.runAsCLI();
}

run();
