import {MigrationInterface, QueryRunner} from "typeorm";

export class ActivityDate1576593191399 implements MigrationInterface {
    name = 'ActivityDate1576593191399'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "activity" ADD "date" date NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "activity" ADD "date" TIMESTAMP NOT NULL`, undefined);
    }

}
