import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationBetweenUsersAndPosts1699440304041 implements MigrationInterface {
    name = 'AddRelationBetweenUsersAndPosts1699440304041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Posts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "userId"`);
    }

}
