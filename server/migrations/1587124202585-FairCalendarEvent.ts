import {MigrationInterface, QueryRunner} from "typeorm";

export class FairCalendarEvent1587124202585 implements MigrationInterface {
    name = 'FairCalendarEvent1587124202585'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "event_type_enum" AS ENUM('mission', 'support', 'dojo', 'holiday', 'formationConference', 'workFree', 'medicalLeave', 'other')`, undefined);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "event_type_enum" NOT NULL, "time" integer NOT NULL, "date" date NOT NULL, "summary" character varying, "projectId" uuid, "taskId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_56b239fecbe385af3a3186acab0" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_56b239fecbe385af3a3186acab0"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3dde39f7b276bbc735a0f762ead"`, undefined);
        await queryRunner.query(`DROP TABLE "event"`, undefined);
        await queryRunner.query(`DROP TYPE "event_type_enum"`, undefined);
    }

}
