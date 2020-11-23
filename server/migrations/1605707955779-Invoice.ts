import {MigrationInterface, QueryRunner} from "typeorm";

export class Invoice1605707955779 implements MigrationInterface {
    name = 'Invoice1605707955779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "quantity" integer NOT NULL, "amount" integer NOT NULL, "discount" integer DEFAULT 0, "invoiceId" uuid NOT NULL, CONSTRAINT "PK_cd7d33c1c91b479709adc5328b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "invoice_status_enum" AS ENUM('draft', 'sent', 'payed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "invoice_status_enum" NOT NULL, "invoiceId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "expiryDate" TIMESTAMP NOT NULL, "ownerId" uuid NOT NULL, "quoteId" uuid, "customerId" uuid NOT NULL, CONSTRAINT "UQ_8ff787c7772b6c47b251641a388" UNIQUE ("invoiceId"), CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_d198acc598a7a520998193ccd4c" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_b93cd6c332ff301398aa97ab2b8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_1354352a7fa5c63183607771552" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_578708a868391988c279cf8ee7b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_578708a868391988c279cf8ee7b"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_1354352a7fa5c63183607771552"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_b93cd6c332ff301398aa97ab2b8"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_d198acc598a7a520998193ccd4c"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TYPE "invoice_status_enum"`);
        await queryRunner.query(`DROP TABLE "invoice_item"`);
    }

}
