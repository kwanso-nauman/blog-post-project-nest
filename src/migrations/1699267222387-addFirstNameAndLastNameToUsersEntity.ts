import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFirstNameAndLastNameToUsersEntity1699267222387 implements MigrationInterface {
    name = 'AddFirstNameAndLastNameToUsersEntity1699267222387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "firstName"`);
    }

}
