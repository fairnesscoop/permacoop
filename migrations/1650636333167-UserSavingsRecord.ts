import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSavingsRecord1650636333167 implements MigrationInterface {
    name = 'UserSavingsRecord1650636333167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_savings_record_type_enum" AS ENUM('input', 'output')`);
        await queryRunner.query(`CREATE TABLE "user_savings_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "type" "user_savings_record_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "PK_f5f68a0ad3332f08e8adc70a4c6" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_savings_record"."amount" IS 'Stored in base 100'`);
        await queryRunner.query(`ALTER TABLE "user_savings_record" ADD CONSTRAINT "FK_b126b5220c39f0c684fd3929eac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_savings_record" DROP CONSTRAINT "FK_b126b5220c39f0c684fd3929eac"`);
        await queryRunner.query(`DROP TABLE "user_savings_record"`);
        await queryRunner.query(`DROP TYPE "user_savings_record_type_enum"`);
    }

}
