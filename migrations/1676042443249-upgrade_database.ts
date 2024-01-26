import { MigrationInterface, QueryRunner } from "typeorm";

export class upgradeDatabase1676042443249 implements MigrationInterface {
    name = 'upgradeDatabase1676042443249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_rate"."amount" IS 'Stored in base 100'`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."quantity" IS 'Stored in base 100'`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."amount" IS 'Stored in base 100'`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."discount" IS 'Stored in base 100'`);
        await queryRunner.query(`COMMENT ON COLUMN "quote_item"."quantity" IS 'Stored in base 100'`);
        await queryRunner.query(`COMMENT ON COLUMN "quote_item"."dailyRate" IS 'Stored in base 100'`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "event"."time" IS 'Stored in minutes'`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "uploadedAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "cooperative"."dayDuration" IS 'Stored in minutes'`);
        await queryRunner.query(`COMMENT ON COLUMN "leave"."time" IS 'Stored in minutes'`);
        await queryRunner.query(`ALTER TABLE "interest_rate" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_savings_record" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_savings_record" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "interest_rate" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "leave"."time" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cooperative"."dayDuration" IS NULL`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "uploadedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "event"."time" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "quote_item"."dailyRate" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "quote_item"."quantity" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."discount" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."amount" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "invoice_item"."quantity" IS NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_rate"."amount" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
    }

}
