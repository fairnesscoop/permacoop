import {MigrationInterface, QueryRunner} from "typeorm";

export class makeMealTicketRemovalCommentNullable1633787043133 implements MigrationInterface {
    name = 'makeMealTicketRemovalCommentNullable1633787043133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ALTER COLUMN "comment" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ticket_removal" ALTER COLUMN "comment" SET NOT NULL`);
    }

}
