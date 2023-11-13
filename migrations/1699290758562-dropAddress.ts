import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAddress1699290758562 implements MigrationInterface {
    name = 'DropAddress1699290758562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7697a356e1f4b79ab3819839e95"`);
        await queryRunner.query(`ALTER TABLE "cooperative" DROP CONSTRAINT "FK_76076f95b4afaa794ca4a974661"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "cooperative" DROP COLUMN "addressId"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying(6) NOT NULL, "country" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cooperative" ADD "addressId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "cooperative" ADD CONSTRAINT "FK_76076f95b4afaa794ca4a974661" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7697a356e1f4b79ab3819839e95" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
}
