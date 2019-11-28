import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitModels1574690739040 implements MigrationInterface {
  name = 'InitModels1574690739040';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" uuid NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "apiToken" character varying, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "api-token" ON "user" ("apiToken") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" integer NOT NULL, "date" TIMESTAMP NOT NULL, "summary" character varying, "projectId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_5a898f44fa31ef7916f0c38b016" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_5a898f44fa31ef7916f0c38b016"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "activity"`, undefined);
    await queryRunner.query(`DROP INDEX "api-token"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "project"`, undefined);
    await queryRunner.query(`DROP TABLE "customer"`, undefined);
  }
}
