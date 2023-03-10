import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeInvoices1678458554609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice_item"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
