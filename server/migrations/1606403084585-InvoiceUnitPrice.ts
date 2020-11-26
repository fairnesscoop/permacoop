import {MigrationInterface, QueryRunner} from "typeorm";

export class InvoiceUnitPrice1606403084585 implements MigrationInterface {
    name = 'InvoiceUnitPrice1606403084585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_item" RENAME COLUMN "timeSpent" TO "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_item" RENAME COLUMN "quantity" TO "timeSpent"`);
    }

}
