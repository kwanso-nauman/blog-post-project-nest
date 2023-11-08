import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBodyToCommentsEntity1699443575132 implements MigrationInterface {
    name = 'AddColumnBodyToCommentsEntity1699443575132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comments" ADD "body" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "body"`);
    }

}
