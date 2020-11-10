import {MigrationInterface, QueryRunner} from "typeorm";

export class ModelsRestructuration1604827206393 implements MigrationInterface {
    name = 'ModelsRestructuration1604827206393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "entryDate" TO "userAdministrativeId"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying(6) NOT NULL, "country" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_administrative_contract_enum" AS ENUM('cdi', 'cdd', 'ctt', 'apprenticeship', 'professionalization')`);
        await queryRunner.query(`CREATE TABLE "user_administrative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "joiningDate" TIMESTAMP NOT NULL, "leavingDate" TIMESTAMP, "annualEarnings" integer NOT NULL, "transportFee" integer DEFAULT 0, "healthInsurance" boolean NOT NULL, "executivePosition" boolean NOT NULL, "contract" "user_administrative_contract_enum" NOT NULL, CONSTRAINT "PK_3a17ceae75a0f330edb671f4b76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "daily_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "customerId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_e61570c7fbd239a42b77d44b5d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quote_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "quantity" integer NOT NULL, "dailyRate" integer NOT NULL, "quoteId" uuid NOT NULL, CONSTRAINT "PK_a491f996b20f4b5110ec480e6bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "quote_status_enum" AS ENUM('draft', 'sent', 'refused', 'accepted', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "quote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "quote_status_enum" NOT NULL, "quoteId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "ownerId" uuid NOT NULL, "customerId" uuid NOT NULL, "projectId" uuid, CONSTRAINT "UQ_88778de0e0cd0f6aa68759539a9" UNIQUE ("quoteId"), CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "event_type_enum" AS ENUM('mission', 'support', 'dojo', 'formationConference', 'other')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "event_type_enum" NOT NULL, "time" integer NOT NULL, "date" date NOT NULL, "summary" character varying, "projectId" uuid, "taskId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, "uploadedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "leave_request_status_enum" AS ENUM('pending', 'accepted', 'refused')`);
        await queryRunner.query(`CREATE TYPE "leave_request_type_enum" AS ENUM('paid', 'unpaid', 'special', 'medical')`);
        await queryRunner.query(`CREATE TABLE "leave_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "leave_request_status_enum" NOT NULL, "type" "leave_request_type_enum" NOT NULL, "startDate" TIMESTAMP NOT NULL, "startsAllDay" boolean NOT NULL DEFAULT true, "endDate" TIMESTAMP NOT NULL, "endsAllDay" boolean NOT NULL DEFAULT true, "comment" character varying, "moderationComment" character varying, "moderateAt" TIMESTAMP, "moderatorId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_6f6ed3822203a4e10a5753368db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leave" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" integer NOT NULL, "date" date NOT NULL, "leaveRequestId" uuid NOT NULL, CONSTRAINT "PK_501f6ea368365d2a40b1660e16b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pay_slip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "fileId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_e72b1f1b8125bd49e7a677fc54f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "addressId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "dayDuration" integer NOT NULL DEFAULT 7`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userAdministrativeId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userAdministrativeId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2a1d6d2b61221739eeaa9b7a06f" UNIQUE ("userAdministrativeId")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7697a356e1f4b79ab3819839e95" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2a1d6d2b61221739eeaa9b7a06f" FOREIGN KEY ("userAdministrativeId") REFERENCES "user_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_55d9b1674de0a89daff62e84a27" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_ec8d839079b34c959733417b1f2" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote_item" ADD CONSTRAINT "FK_6296266787152fd91f74cb9d1d1" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_d0a82ae7e4d8ba9e9b7337d3982" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_588da10cc115a4d5c4af2955062" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_56b239fecbe385af3a3186acab0" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_7071eaa10caf1fafb5d079ea22c" FOREIGN KEY ("moderatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_ccd082c03225c86d707142fa0dc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave" ADD CONSTRAINT "FK_b75573f53c72d91fd15e38ff4b9" FOREIGN KEY ("leaveRequestId") REFERENCES "leave_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_acd0da7cbdbc23c5a47318202a7"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_588da10cc115a4d5c4af2955062"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_d0a82ae7e4d8ba9e9b7337d3982"`);
        await queryRunner.query(`ALTER TABLE "quote_item" DROP CONSTRAINT "FK_6296266787152fd91f74cb9d1d1"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_ec8d839079b34c959733417b1f2"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_55d9b1674de0a89daff62e84a27"`);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2a1d6d2b61221739eeaa9b7a06f"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7697a356e1f4b79ab3819839e95"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2a1d6d2b61221739eeaa9b7a06f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userAdministrativeId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userAdministrativeId" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dayDuration"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "addressId"`);
        await queryRunner.query(`DROP TABLE "pay_slip"`);
        await queryRunner.query(`DROP TABLE "leave"`);
        await queryRunner.query(`DROP TABLE "leave_request"`);
        await queryRunner.query(`DROP TYPE "leave_request_type_enum"`);
        await queryRunner.query(`DROP TYPE "leave_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "event_type_enum"`);
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP TYPE "quote_status_enum"`);
        await queryRunner.query(`DROP TABLE "quote_item"`);
        await queryRunner.query(`DROP TABLE "daily_rate"`);
        await queryRunner.query(`DROP TABLE "user_administrative"`);
        await queryRunner.query(`DROP TYPE "user_administrative_contract_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userAdministrativeId" TO "entryDate"`);
    }

}
