import {MigrationInterface, QueryRunner} from "typeorm";

export class Billing1605707955778 implements MigrationInterface {
    name = 'Billing1605707955778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "billing_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "quantity" integer NOT NULL, "amount" integer NOT NULL, "discount" integer DEFAULT 0, "billingId" uuid NOT NULL, CONSTRAINT "PK_cd7d33c1c91b479709adc5328b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "billing_status_enum" AS ENUM('draft', 'sent', 'payed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "billing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "billing_status_enum" NOT NULL, "billingId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "expiryDate" TIMESTAMP NOT NULL, "ownerId" uuid NOT NULL, "quoteId" uuid, "customerId" uuid NOT NULL, CONSTRAINT "UQ_8ff787c7772b6c47b251641a388" UNIQUE ("billingId"), CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "billing_item" ADD CONSTRAINT "FK_d198acc598a7a520998193ccd4c" FOREIGN KEY ("billingId") REFERENCES "billing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_b93cd6c332ff301398aa97ab2b8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_1354352a7fa5c63183607771552" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_578708a868391988c279cf8ee7b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_578708a868391988c279cf8ee7b"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_1354352a7fa5c63183607771552"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_b93cd6c332ff301398aa97ab2b8"`);
        await queryRunner.query(`ALTER TABLE "billing_item" DROP CONSTRAINT "FK_d198acc598a7a520998193ccd4c"`);
        await queryRunner.query(`DROP TABLE "billing"`);
        await queryRunner.query(`DROP TYPE "billing_status_enum"`);
        await queryRunner.query(`DROP TABLE "billing_item"`);
    }

}
