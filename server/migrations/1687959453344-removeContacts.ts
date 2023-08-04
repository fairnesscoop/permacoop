import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveContacts1687959453344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // noop
    }

}
