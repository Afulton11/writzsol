import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPageEntity1607360100332 implements MigrationInterface {
    name = 'AddPageEntity1607360100332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "websiteId" uuid NOT NULL, "path" character varying(120) NOT NULL, "blocks" jsonb, "isPublished" boolean NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "FK_94e97a381341be377890b578a62" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_94e97a381341be377890b578a62"`);
        await queryRunner.query(`DROP TABLE "page"`);
    }

}
