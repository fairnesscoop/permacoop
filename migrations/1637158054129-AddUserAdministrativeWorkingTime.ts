import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAdministrativeWorkingTime1637158054129
  implements MigrationInterface {
  name = 'AddUserAdministrativeWorkingTime1637158054129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_administrative_workingtime_enum" AS ENUM('full_time', 'part_time')`
    );
    await queryRunner.query(
      `ALTER TABLE "user_administrative" ADD "workingTime" "user_administrative_workingtime_enum"`
    );
    await queryRunner.query(
      `UPDATE "user_administrative" SET "workingTime" = 'full_time'`
    );
    await queryRunner.query(
      `ALTER TABLE "user_administrative" ALTER "workingTime" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_administrative" DROP COLUMN "workingTime"`
    );
    await queryRunner.query(`DROP TYPE "user_administrative_workingtime_enum"`);
  }
}
