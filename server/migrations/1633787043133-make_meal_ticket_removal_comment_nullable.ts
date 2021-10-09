import {MigrationInterface, QueryRunner} from "typeorm";

export class makeMealTicketRemovalCommentNullable1633787043133 implements MigrationInterface {
    name = 'makeMealTicketRemovalCommentNullable1633787043133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" DROP CONSTRAINT "UQ_484832a1c2f5aa18b60e8ca5a93"`);
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ALTER COLUMN "comment" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ALTER COLUMN "comment" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ADD CONSTRAINT "UQ_484832a1c2f5aa18b60e8ca5a93" UNIQUE ("date", "userId")`);
    }

}
