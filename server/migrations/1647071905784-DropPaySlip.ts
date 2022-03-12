import {MigrationInterface, QueryRunner} from "typeorm";

export class DropPaySlip1647071905784 implements MigrationInterface {
    name = 'DropPaySlip1647071905784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3"`);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8"`);
        await queryRunner.query(`DROP TABLE "pay_slip"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
