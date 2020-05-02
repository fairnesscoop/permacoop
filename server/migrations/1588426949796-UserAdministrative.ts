import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAdministrative1588426949796 implements MigrationInterface {
    name = 'UserAdministrative1588426949796'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "user_administrative_contract_enum" AS ENUM('cdi', 'cdd', 'ctt', 'apprenticeship', 'professionalization')`, undefined);
        await queryRunner.query(`CREATE TABLE "user_administrative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "joiningDate" TIMESTAMP NOT NULL, "leavingDate" TIMESTAMP, "annualEarnings" integer NOT NULL, "transportFee" integer DEFAULT 0, "healthInsurance" boolean NOT NULL, "executivePosition" boolean NOT NULL, "contract" "user_administrative_contract_enum" NOT NULL, CONSTRAINT "PK_3a17ceae75a0f330edb671f4b76" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "userAdministrativeId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2a1d6d2b61221739eeaa9b7a06f" UNIQUE ("userAdministrativeId")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2a1d6d2b61221739eeaa9b7a06f" FOREIGN KEY ("userAdministrativeId") REFERENCES "user_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "entryDate"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "entryDate" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2a1d6d2b61221739eeaa9b7a06f"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2a1d6d2b61221739eeaa9b7a06f"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userAdministrativeId"`, undefined);
        await queryRunner.query(`DROP TABLE "user_administrative"`, undefined);
    }

}
