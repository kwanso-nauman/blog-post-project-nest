import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailAndPasswordColsToUsersEntity1699267043855 implements MigrationInterface {
    name = 'AddEmailAndPasswordColsToUsersEntity1699267043855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "email"`);
    }

}
