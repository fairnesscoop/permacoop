import {MigrationInterface, QueryRunner} from "typeorm";

export class InterestRate1651674281488 implements MigrationInterface {
    name = 'InterestRate1651674281488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interest_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_e0dc77d8cda169497a847de0f8b" PRIMARY KEY ("id")); COMMENT ON COLUMN "interest_rate"."rate" IS 'Stored in base 100'`);
        await queryRunner.query(`ALTER TABLE "user_savings_record" ADD "interestRateId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_savings_record" ADD CONSTRAINT "FK_b88b218db366c70a2ec33e424a2" FOREIGN KEY ("interestRateId") REFERENCES "interest_rate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "interest_rate" VALUES('9ae76df0-2ae6-40f8-a2e2-fad0371bcfa9', '100', '2022-05-04')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_savings_record" DROP CONSTRAINT "FK_b88b218db366c70a2ec33e424a2"`);
        await queryRunner.query(`ALTER TABLE "user_savings_record" DROP COLUMN "interestRateId"`);
        await queryRunner.query(`DROP TABLE "interest_rate"`);
    }

}
