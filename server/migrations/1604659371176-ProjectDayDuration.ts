import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectDayDuration1604659371176 implements MigrationInterface {
    name = 'ProjectDayDuration1604659371176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "dayDuration" integer NOT NULL DEFAULT 7`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dayDuration"`);
    }

}
