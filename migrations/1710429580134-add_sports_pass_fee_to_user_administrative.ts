import { MigrationInterface, QueryRunner } from "typeorm";

export class addSportsPassFeeToUserAdministrative1710429580134 implements MigrationInterface {
    name = 'addSportsPassFeeToUserAdministrative1710429580134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "sportsPassFee" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "sportsPassFee"`);
    }
}
