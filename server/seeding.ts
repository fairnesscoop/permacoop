import { SeedingSource } from '@concepta/typeorm-seeding';

import { config } from 'dotenv';
import { AppSeeder } from './src/DataSeeding/Seeders/AppSeeder';

import dataSource from 'src/datasource';

config();

export default new SeedingSource({
  dataSource,
  seeders: [AppSeeder],
  defaultSeeders: [AppSeeder],
});

