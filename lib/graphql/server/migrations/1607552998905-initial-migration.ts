import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1607552998905 implements MigrationInterface {
    name = 'initialMigration1607552998905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "websiteId" uuid NOT NULL, "path" character varying(120) NOT NULL, "blocks" jsonb, "isPublished" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, CONSTRAINT "UQ_e677809bf386bebe36a671deba9" UNIQUE ("path", "websiteId"), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "website_status_enum" AS ENUM('PRIVATE', 'PUBLISHED')`);
        await queryRunner.query(`CREATE TABLE "website" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(60) NOT NULL, "location" character varying(120) NOT NULL, "status" "website_status_enum" NOT NULL DEFAULT 'PRIVATE', "defaultTheme" character varying(32) NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_3382d5b38124f14f8893e60ee5d" UNIQUE ("location"), CONSTRAINT "UQ_8562779e6aa94ae5c966e4ab6c5" UNIQUE ("title", "userId"), CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('USER', 'ADMIN', 'DEVELOPER')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "email" character varying(320), "emailVerified" TIMESTAMP WITH TIME ZONE, "image" text, "role" "user_role_enum" NOT NULL DEFAULT 'USER', "websitesId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "provider_account" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "compoundId" character varying(255) NOT NULL, "providerId" character varying(255) NOT NULL, "providerAccountId" character varying(255) NOT NULL, "providerType" character varying(255) NOT NULL, "refreshToken" text, "accessToken" text, "accessTokenExpires" TIMESTAMP WITH TIME ZONE, "userId" uuid NOT NULL, CONSTRAINT "REL_5986491ee1e50d84d00621a500" UNIQUE ("userId"), CONSTRAINT "PK_bc676d10be9807a0c1e67ca98b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b2e0ffdd9e022df334e25c2089" ON "provider_account" ("compoundId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b142d2baa809d7d2cecce107e7" ON "provider_account" ("providerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6c51996da812b635605e8a25a4" ON "provider_account" ("providerAccountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5986491ee1e50d84d00621a500" ON "provider_account" ("userId") `);
        await queryRunner.query(`CREATE TABLE "verification_request" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9d9499e0fabae343c7ec3ecfac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5ebed08ac78d30f9b04a2c4bcb" ON "verification_request" ("token") `);
        await queryRunner.query(`CREATE TABLE "writzsol_session" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "sessionToken" character varying(255) NOT NULL, "accessToken" character varying(255) NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_4368f6566237ce9029b9122c4d" UNIQUE ("userId"), CONSTRAINT "PK_fcc8b9c3aabbdd5ebc671f9816f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a5ea312beda0ee86ed0a272096" ON "writzsol_session" ("sessionToken") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fdaf8079fd4289cd8b37c7dfaf" ON "writzsol_session" ("accessToken") `);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "FK_94e97a381341be377890b578a62" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e" FOREIGN KEY ("websitesId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_account" ADD CONSTRAINT "FK_5986491ee1e50d84d00621a500b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "writzsol_session" ADD CONSTRAINT "FK_4368f6566237ce9029b9122c4d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "writzsol_session" DROP CONSTRAINT "FK_4368f6566237ce9029b9122c4d1"`);
        await queryRunner.query(`ALTER TABLE "provider_account" DROP CONSTRAINT "FK_5986491ee1e50d84d00621a500b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e"`);
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_94e97a381341be377890b578a62"`);
        await queryRunner.query(`DROP INDEX "IDX_fdaf8079fd4289cd8b37c7dfaf"`);
        await queryRunner.query(`DROP INDEX "IDX_a5ea312beda0ee86ed0a272096"`);
        await queryRunner.query(`DROP TABLE "writzsol_session"`);
        await queryRunner.query(`DROP INDEX "IDX_5ebed08ac78d30f9b04a2c4bcb"`);
        await queryRunner.query(`DROP TABLE "verification_request"`);
        await queryRunner.query(`DROP INDEX "IDX_5986491ee1e50d84d00621a500"`);
        await queryRunner.query(`DROP INDEX "IDX_6c51996da812b635605e8a25a4"`);
        await queryRunner.query(`DROP INDEX "IDX_b142d2baa809d7d2cecce107e7"`);
        await queryRunner.query(`DROP INDEX "IDX_b2e0ffdd9e022df334e25c2089"`);
        await queryRunner.query(`DROP TABLE "provider_account"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "website"`);
        await queryRunner.query(`DROP TYPE "website_status_enum"`);
        await queryRunner.query(`DROP TABLE "page"`);
    }

}
