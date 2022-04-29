import {MigrationInterface, QueryRunner} from "typeorm";

export class IllimitedLeaveType1651234850677 implements MigrationInterface {
    name = 'IllimitedLeaveType1651234850677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "leave_request_type_enum" RENAME TO "leave_request_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "leave_request_type_enum" AS ENUM('paid', 'unpaid', 'special', 'medical', 'illimited')`);
        await queryRunner.query(`ALTER TABLE "leave_request" ALTER COLUMN "type" TYPE "leave_request_type_enum" USING "type"::"text"::"leave_request_type_enum"`);
        await queryRunner.query(`DROP TYPE "leave_request_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "leave_request_type_enum_old" AS ENUM('paid', 'unpaid', 'special', 'medical')`);
        await queryRunner.query(`ALTER TABLE "leave_request" ALTER COLUMN "type" TYPE "leave_request_type_enum_old" USING "type"::"text"::"leave_request_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "leave_request_type_enum"`);
        await queryRunner.query(`ALTER TYPE "leave_request_type_enum_old" RENAME TO "leave_request_type_enum"`);
    }
}
