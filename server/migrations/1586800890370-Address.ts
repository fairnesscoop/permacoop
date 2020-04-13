import {MigrationInterface, QueryRunner} from "typeorm";

export class Address1586800890370 implements MigrationInterface {
    name = 'Address1586800890370'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying(6) NOT NULL, "country" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "addressId" uuid NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_7697a356e1f4b79ab3819839e95" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_7697a356e1f4b79ab3819839e95"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "addressId"`, undefined);
        await queryRunner.query(`DROP TABLE "address"`, undefined);
    }

}
