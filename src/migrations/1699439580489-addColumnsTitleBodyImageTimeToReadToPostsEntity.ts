import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsTitleBodyImageTimeToReadToPostsEntity1699439580489 implements MigrationInterface {
    name = 'AddColumnsTitleBodyImageTimeToReadToPostsEntity1699439580489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Posts" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "body" character varying`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "timeToRead" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "timeToRead"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "title"`);
    }

}
