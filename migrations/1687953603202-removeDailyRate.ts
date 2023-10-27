import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveDailyRate1687953603202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "daily_rate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // noop
    }
}
