import {MigrationInterface, QueryRunner} from "typeorm";

export class DropProjectDayDuration1648283366970 implements MigrationInterface {
    name = 'DropProjectDayDuration1648283366970'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dayDuration"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
