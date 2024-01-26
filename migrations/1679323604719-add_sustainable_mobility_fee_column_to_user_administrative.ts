import { MigrationInterface, QueryRunner } from "typeorm";

export class addSustainableMobilityFeeColumnToUserAdministrative1679323604719 implements MigrationInterface {
    name = 'addSustainableMobilityFeeColumnToUserAdministrative1679323604719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "sustainableMobilityFee" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "sustainableMobilityFee"`);
    }

}
