import {MigrationInterface, QueryRunner} from 'typeorm';

export class RemoveActivities1587374266182 implements MigrationInterface {
  name = 'RemoveActivities1587374266182';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "activity"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
