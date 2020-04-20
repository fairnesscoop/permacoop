import {MigrationInterface, QueryRunner} from "typeorm";

export class DailyRate1587385769133 implements MigrationInterface {
    name = 'DailyRate1587385769133'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "daily_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "customerId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_e61570c7fbd239a42b77d44b5d7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_55d9b1674de0a89daff62e84a27" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "daily_rate" ADD CONSTRAINT "FK_ec8d839079b34c959733417b1f2" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_ec8d839079b34c959733417b1f2"`, undefined);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_55d9b1674de0a89daff62e84a27"`, undefined);
        await queryRunner.query(`ALTER TABLE "daily_rate" DROP CONSTRAINT "FK_8d819ca9e2a6d7c09e35bd3a2df"`, undefined);
        await queryRunner.query(`DROP TABLE "daily_rate"`, undefined);
    }

}
