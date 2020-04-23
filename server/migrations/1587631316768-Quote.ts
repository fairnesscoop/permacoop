import {MigrationInterface, QueryRunner} from "typeorm";

export class Quote1587631316768 implements MigrationInterface {
    name = 'Quote1587631316768'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "quote_status_enum" AS ENUM('draft', 'sent', 'refused', 'accepted', 'canceled')`, undefined);
        await queryRunner.query(`CREATE TABLE "quote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "quote_status_enum" NOT NULL, "quoteId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "ownerId" uuid NOT NULL, "customerId" uuid NOT NULL, "projectId" uuid, CONSTRAINT "UQ_88778de0e0cd0f6aa68759539a9" UNIQUE ("quoteId"), CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "quote_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "quantity" integer NOT NULL, "dailyRate" integer NOT NULL, "quoteId" uuid NOT NULL, CONSTRAINT "PK_a491f996b20f4b5110ec480e6bc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_d0a82ae7e4d8ba9e9b7337d3982" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_588da10cc115a4d5c4af2955062" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "quote_item" ADD CONSTRAINT "FK_6296266787152fd91f74cb9d1d1" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "quote_item" DROP CONSTRAINT "FK_6296266787152fd91f74cb9d1d1"`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7"`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_588da10cc115a4d5c4af2955062"`, undefined);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_d0a82ae7e4d8ba9e9b7337d3982"`, undefined);
        await queryRunner.query(`DROP TABLE "quote_item"`, undefined);
        await queryRunner.query(`DROP TABLE "quote"`, undefined);
        await queryRunner.query(`DROP TYPE "quote_status_enum"`, undefined);
    }

}
