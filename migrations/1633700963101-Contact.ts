import { MigrationInterface, QueryRunner } from 'typeorm';

export class Contact1633700963101 implements MigrationInterface {
  name = 'Contact1633700963101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstName" character varying, "lastName" character varying, "company" character varying, "email" character varying, "phoneNumber" character varying, "notes" character varying, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact"`);
  }
}
