import {MigrationInterface, QueryRunner} from "typeorm";

export class Holiday1588872587472 implements MigrationInterface {
    name = 'Holiday1588872587472'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_252d4cbbedfa1f1fb66ada01a07"`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_e70c3a9343494ab691a33302fe5"`, undefined);
        await queryRunner.query(`CREATE TYPE "holiday_status_enum" AS ENUM('pending', 'accepted', 'refused')`, undefined);
        await queryRunner.query(`CREATE TYPE "holiday_leavetype_enum" AS ENUM('paid', 'unpaid', 'special', 'medical')`, undefined);
        await queryRunner.query(`CREATE TABLE "holiday" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "holiday_status_enum" NOT NULL, "leaveType" "holiday_leavetype_enum" NOT NULL, "startDate" TIMESTAMP NOT NULL, "startsAllDay" boolean NOT NULL DEFAULT true, "endDate" TIMESTAMP NOT NULL, "endsAllDay" boolean NOT NULL DEFAULT true, "comment" character varying, "moderateAt" TIMESTAMP, "moderatorId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_3e7492c25f80418a7aad0aec053" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "holiday" ADD CONSTRAINT "FK_ff5a3d7c5305ccd35561624c7e6" FOREIGN KEY ("moderatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "holiday" ADD CONSTRAINT "FK_87112d6e6d22a8d60a1fb6df4c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_d48b7a3b5c5e816cb6777afc2f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" DROP CONSTRAINT "FK_cd5cd71ddb533d9b8706d9b5fa8"`, undefined);
        await queryRunner.query(`ALTER TABLE "holiday" DROP CONSTRAINT "FK_87112d6e6d22a8d60a1fb6df4c8"`, undefined);
        await queryRunner.query(`ALTER TABLE "holiday" DROP CONSTRAINT "FK_ff5a3d7c5305ccd35561624c7e6"`, undefined);
        await queryRunner.query(`DROP TABLE "holiday"`, undefined);
        await queryRunner.query(`DROP TYPE "holiday_leavetype_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "holiday_status_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_e70c3a9343494ab691a33302fe5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pay_slip" ADD CONSTRAINT "FK_252d4cbbedfa1f1fb66ada01a07" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
