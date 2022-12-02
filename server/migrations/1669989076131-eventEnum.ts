import { MigrationInterface, QueryRunner } from "typeorm";

export class eventEnum1669989076131 implements MigrationInterface {
    name = 'EventEnum1669989076131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."event_type_enum" RENAME TO "event_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."event_type_enum" AS ENUM('mission', 'support', 'dojo', 'formationConference', 'admin', 'other')`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "type" TYPE "public"."event_type_enum" USING "type"::"text"::"public"."event_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."event_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."event_type_enum_old" AS ENUM('mission', 'support', 'dojo', 'formationConference', 'other')`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "type" TYPE "public"."event_type_enum_old" USING "type"::"text"::"public"."event_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."event_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."event_type_enum_old" RENAME TO "event_type_enum"`);
    }

}
