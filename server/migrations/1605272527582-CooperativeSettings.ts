import {MigrationInterface, QueryRunner} from "typeorm";

export class CooperativeSettings1605272527582 implements MigrationInterface {
    name = 'CooperativeSettings1605272527582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cooperative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dayDuration" integer NOT NULL DEFAULT 420, "addressId" uuid NOT NULL, CONSTRAINT "PK_b53942b37eb26a5d32a9a6ed455" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cooperative" ADD CONSTRAINT "FK_76076f95b4afaa794ca4a974661" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "address" VALUES('d784e499-1242-471c-9590-d3f77d1919ec', '2 rue Dieu', 'Paris', '75010', 'FR')`, undefined);
        await queryRunner.query(`INSERT INTO "cooperative" VALUES('863f007e-7490-4a8d-8f78-27230791de8d', 'Fairness', 420, 'd784e499-1242-471c-9590-d3f77d1919ec')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cooperative" DROP CONSTRAINT "FK_76076f95b4afaa794ca4a974661"`);
        await queryRunner.query(`DROP TABLE "cooperative"`);
    }

}
