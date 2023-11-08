import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSelfReferenceRelationForComments1699447234717 implements MigrationInterface {
    name = 'AddSelfReferenceRelationForComments1699447234717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comments" ADD "parentCommentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_c063d6cc2ddc46389c9ca03b5a3" FOREIGN KEY ("parentCommentId") REFERENCES "Comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_c063d6cc2ddc46389c9ca03b5a3"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "parentCommentId"`);
    }

}
