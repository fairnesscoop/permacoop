import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveQuote1687944271705 implements MigrationInterface {
    name = 'RemoveQuote1687944271705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quote_item"`);
        await queryRunner.query(`DROP TABLE "quote"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // noop
    }
}
