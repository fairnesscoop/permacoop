import {MigrationInterface, QueryRunner} from "typeorm";

export class EventBillable1605556978071 implements MigrationInterface {
    name = 'EventBillable1605556978071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "billable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."dayDuration" IS 'Stored in minutes'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "dayDuration" SET DEFAULT 420`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "dayDuration" SET DEFAULT 7`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."dayDuration" IS ''`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "billable"`);
    }

}
