import {MigrationInterface, QueryRunner} from "typeorm";

export class InitModel1575020116603 implements MigrationInterface {
    name = 'InitModel1575020116603'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, undefined);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" uuid NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('cooperator', 'accountant', 'employee')`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "apiToken" character varying, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "entryDate" TIMESTAMP,"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `, undefined);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`INSERT INTO "user" VALUES('c5dc7188-cdf7-4439-a936-4379a79635de', 'John', 'Doe', 'john@doe.com', '$argon2i$v=19$m=4096,t=3,p=1$u7Jw1anFWyHcpfeOxjGYuQ$Ic4YheZZK9aF81q7CW8geSiG6Bsy+f52EnKTyzBlEXE', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A', 'cooperator', '2020-04-04')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`, undefined);
        await queryRunner.query(`DROP TABLE "task"`, undefined);
        await queryRunner.query(`DROP INDEX "api-token"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
    }

}
