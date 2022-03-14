import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1647211100342 implements MigrationInterface {
    name = 'updateUser1647211100342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

}
