import {MigrationInterface, QueryRunner} from "typeorm";

export class addContactContactedby1645798997884 implements MigrationInterface {
    name = 'addContactContactedby1645798997884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "contactedById" uuid`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_ffba1fb926fd8e7121345ebeeb8" FOREIGN KEY ("contactedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_ffba1fb926fd8e7121345ebeeb8"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "contactedById"`);
    }

}
