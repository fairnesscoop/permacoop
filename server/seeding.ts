import * as path from 'path';
import { SeedingSource } from '@concepta/typeorm-seeding';

import { config } from 'dotenv';
import { AppSeeder } from './src/DataSeeding/Seeders/AppSeeder';

import dataSource from 'src/datasource';

config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

export default new SeedingSource({
  dataSource,
  seeders: [AppSeeder],
  defaultSeeders: [AppSeeder],
});

