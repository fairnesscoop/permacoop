import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectActive1716653153304 implements MigrationInterface {
    name = 'ProjectActive1716653153304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "active"`);
    }

}
