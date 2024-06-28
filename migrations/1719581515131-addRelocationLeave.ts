import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelocationLeave1719581515131
  implements MigrationInterface {
  name = 'AddRelocationLeave1719581515131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."leave_request_type_enum" RENAME TO "leave_request_type_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."leave_request_type_enum" AS ENUM('paid', 'unpaid', 'special', 'medical', 'illimited', 'postponedWorkedFreeDay', 'relocation')`
    );
    await queryRunner.query(
      `ALTER TABLE "leave_request" ALTER COLUMN "type" TYPE "public"."leave_request_type_enum" USING "type"::"text"::"public"."leave_request_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."leave_request_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."leave_request_type_enum_old" AS ENUM('paid', 'unpaid', 'special', 'medical', 'illimited', 'postponedWorkedFreeDay')`
    );
    await queryRunner.query(
      `ALTER TABLE "leave_request" ALTER COLUMN "type" TYPE "public"."leave_request_type_enum_old" USING "type"::"text"::"public"."leave_request_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."leave_request_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."leave_request_type_enum_old" RENAME TO "leave_request_type_enum"`
    );
  }
}
