import {MigrationInterface, QueryRunner} from "typeorm";

export class tableUsers1647180789115 implements MigrationInterface {
    name = 'tableUsers1647180789115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "CPF" character varying NOT NULL, "CEP" character varying NOT NULL, "Street" character varying NOT NULL, "City" character varying NOT NULL, "State" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
