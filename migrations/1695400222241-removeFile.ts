import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveFile1695400222241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // noop
    }
}
