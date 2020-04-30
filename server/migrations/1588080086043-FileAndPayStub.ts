import {MigrationInterface, QueryRunner} from "typeorm";

export class FileAndPayStub1588080086043 implements MigrationInterface {
    name = 'FileAndPayStub1588080086043'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, "uploadedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pay_stub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "fileId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6a3474cef7b4be2033694e1b2ae" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_stub" ADD CONSTRAINT "FK_252d4cbbedfa1f1fb66ada01a07" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_stub" ADD CONSTRAINT "FK_e70c3a9343494ab691a33302fe5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pay_stub" DROP CONSTRAINT "FK_e70c3a9343494ab691a33302fe5"`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_stub" DROP CONSTRAINT "FK_252d4cbbedfa1f1fb66ada01a07"`, undefined);
        await queryRunner.query(`DROP TABLE "pay_stub"`, undefined);
        await queryRunner.query(`DROP TABLE "file"`, undefined);
    }

}
