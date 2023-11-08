import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsEntity1699439522763 implements MigrationInterface {
    name = 'CreatePostsEntity1699439522763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0f050d6d1112b2d07545b43f945" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Posts"`);
    }

}
