import {MigrationInterface, QueryRunner} from "typeorm";

export class MealTicketRemoval1608728416097 implements MigrationInterface {
    name = 'MealTicketRemoval1608728416097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meal_ticket_removal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "comment" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_16f717305130d7b2765ed2a467c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ADD CONSTRAINT "FK_a27eae7bbdbcbe9d67b5f77dd76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" DROP CONSTRAINT "FK_a27eae7bbdbcbe9d67b5f77dd76"`);
        await queryRunner.query(`DROP TABLE "meal_ticket_removal"`);
    }

}
