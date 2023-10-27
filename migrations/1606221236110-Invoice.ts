import {MigrationInterface, QueryRunner} from "typeorm";

export class Invoice1606221236110 implements MigrationInterface {
    name = 'Invoice1606221236110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7697a356e1f4b79ab3819839e95"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_55d9b1674de0a89daff62e84a27"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_ec8d839079b34c959733417b1f2"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`);
        await queryRunner.query(`ALTER TABLE "quote_item" DROP CONSTRAINT "FK_6296266787152fd91f74cb9d1d1"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_588da10cc115a4d5c4af2955062"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_56b239fecbe385af3a3186acab0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_7071eaa10caf1fafb5d079ea22c"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_ccd082c03225c86d707142fa0dc"`);
        await queryRunner.query(`ALTER TABLE "leave" DROP CONSTRAINT "FK_b75573f53c72d91fd15e38ff4b9"`);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8"`);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3"`);
        await queryRunner.query(`CREATE TABLE "invoice_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "timeSpent" integer NOT NULL, "amount" integer NOT NULL, "discount" integer DEFAULT 0, "invoiceId" uuid NOT NULL, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "invoice_status_enum" AS ENUM('draft', 'sent', 'payed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "invoice_status_enum" NOT NULL, "invoiceId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "expiryDate" TIMESTAMP NOT NULL, "ownerId" uuid, "quoteId" uuid, "projectId" uuid, CONSTRAINT "UQ_c7e255ecd0c1a5ba5cb11e959ae" UNIQUE ("invoiceId"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "project_invoiceunit_enum" AS ENUM('day', 'hour')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "invoiceUnit" "project_invoiceunit_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "addressId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7697a356e1f4b79ab3819839e95" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_55d9b1674de0a89daff62e84a27" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_ec8d839079b34c959733417b1f2" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote_item" ADD CONSTRAINT "FK_6296266787152fd91f74cb9d1d1" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_588da10cc115a4d5c4af2955062" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_9909d4616f166cc7d6107553510" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_21b159910b14c6b2b5e944c969a" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_eca8013d9719930683f74ae7e10" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_56b239fecbe385af3a3186acab0" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_7071eaa10caf1fafb5d079ea22c" FOREIGN KEY ("moderatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_ccd082c03225c86d707142fa0dc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave" ADD CONSTRAINT "FK_b75573f53c72d91fd15e38ff4b9" FOREIGN KEY ("leaveRequestId") REFERENCES "leave_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3"`);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8"`);
        await queryRunner.query(`ALTER TABLE "leave" DROP CONSTRAINT "FK_b75573f53c72d91fd15e38ff4b9"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_ccd082c03225c86d707142fa0dc"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_7071eaa10caf1fafb5d079ea22c"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_56b239fecbe385af3a3186acab0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_eca8013d9719930683f74ae7e10"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_21b159910b14c6b2b5e944c969a"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_9909d4616f166cc7d6107553510"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_588da10cc115a4d5c4af2955062"`);
        await queryRunner.query(`ALTER TABLE "quote_item" DROP CONSTRAINT "FK_6296266787152fd91f74cb9d1d1"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_ec8d839079b34c959733417b1f2"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_55d9b1674de0a89daff62e84a27"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7697a356e1f4b79ab3819839e95"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "addressId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "invoiceUnit"`);
        await queryRunner.query(`DROP TYPE "project_invoiceunit_enum"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TYPE "invoice_status_enum"`);
        await queryRunner.query(`DROP TABLE "invoice_item"`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave" ADD CONSTRAINT "FK_b75573f53c72d91fd15e38ff4b9" FOREIGN KEY ("leaveRequestId") REFERENCES "leave_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_ccd082c03225c86d707142fa0dc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_7071eaa10caf1fafb5d079ea22c" FOREIGN KEY ("moderatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_56b239fecbe385af3a3186acab0" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_588da10cc115a4d5c4af2955062" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote_item" ADD CONSTRAINT "FK_6296266787152fd91f74cb9d1d1" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_ec8d839079b34c959733417b1f2" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_55d9b1674de0a89daff62e84a27" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7697a356e1f4b79ab3819839e95" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
