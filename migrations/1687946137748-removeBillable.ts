import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBillable1687946137748 implements MigrationInterface {
    name = 'RemoveBillable1687946137748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "billable"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "billable" boolean NOT NULL DEFAULT true`);
    }
}
