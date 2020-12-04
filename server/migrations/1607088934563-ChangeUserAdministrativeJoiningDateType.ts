import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserAdministrativeJoiningDateType1607088934563 implements MigrationInterface {
    name = 'ChangeUserAdministrativeJoiningDateType1607088934563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" RENAME COLUMN "joiningDate" TO "joiningDate_old"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "joiningDate" date`);
        await queryRunner.query(`UPDATE "user_administrative" SET "joiningDate" = "joiningDate_old"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "joiningDate_old"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" ALTER "joiningDate" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "user_administrative" RENAME COLUMN "leavingDate" TO "leavingDate_old"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "leavingDate" date`);
        await queryRunner.query(`UPDATE "user_administrative" SET "leavingDate" = "leavingDate_old"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "leavingDate_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "leavingDate"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "leavingDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_administrative" DROP COLUMN "joiningDate"`);
        await queryRunner.query(`ALTER TABLE "user_administrative" ADD "joiningDate" TIMESTAMP NOT NULL`);
    }

}
