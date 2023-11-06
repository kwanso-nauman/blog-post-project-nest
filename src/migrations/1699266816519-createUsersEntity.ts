import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersEntity1699266816519 implements MigrationInterface {
    name = 'CreateUsersEntity1699266816519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
