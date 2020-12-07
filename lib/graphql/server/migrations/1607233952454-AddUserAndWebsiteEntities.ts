import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserAndWebsiteEntities1607233952454 implements MigrationInterface {
    name = 'AddUserAndWebsiteEntities1607233952454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "website_status_enum" AS ENUM('PRIVATE', 'PUBLISHED')`);
        await queryRunner.query(`CREATE TABLE "website" ("id" SERIAL NOT NULL, "title" character varying(60) NOT NULL, "location" character varying(120) NOT NULL, "status" "website_status_enum" NOT NULL DEFAULT 'PRIVATE', "defaultTheme" character varying(32) NOT NULL, CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" character varying(320) NOT NULL, "emailVerified" TIMESTAMP NOT NULL, "image" text NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "websitesId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e" FOREIGN KEY ("websitesId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "website"`);
        await queryRunner.query(`DROP TYPE "website_status_enum"`);
    }

}
