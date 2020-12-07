import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthEntities1607284668201 implements MigrationInterface {
    name = 'AddAuthEntities1607284668201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider_account" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "compoundId" character varying(255) NOT NULL, "provderId" character varying(255) NOT NULL, "providerAccountId" character varying(255) NOT NULL, "providerType" character varying(255) NOT NULL, "refreshToken" text, "accessToken" text, "accessTokenExpires" TIMESTAMP WITH TIME ZONE, "userId" uuid NOT NULL, CONSTRAINT "REL_5986491ee1e50d84d00621a500" UNIQUE ("userId"), CONSTRAINT "PK_bc676d10be9807a0c1e67ca98b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b2e0ffdd9e022df334e25c2089" ON "provider_account" ("compoundId") `);
        await queryRunner.query(`CREATE INDEX "IDX_24a7db9399f7218b81e69ec7c1" ON "provider_account" ("provderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6c51996da812b635605e8a25a4" ON "provider_account" ("providerAccountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5986491ee1e50d84d00621a500" ON "provider_account" ("userId") `);
        await queryRunner.query(`CREATE TABLE "verification_request" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9d9499e0fabae343c7ec3ecfac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5ebed08ac78d30f9b04a2c4bcb" ON "verification_request" ("token") `);
        await queryRunner.query(`CREATE TABLE "writzsol_session" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "sessionToken" character varying(255) NOT NULL, "accessToken" character varying(255) NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_4368f6566237ce9029b9122c4d" UNIQUE ("userId"), CONSTRAINT "PK_fcc8b9c3aabbdd5ebc671f9816f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a5ea312beda0ee86ed0a272096" ON "writzsol_session" ("sessionToken") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fdaf8079fd4289cd8b37c7dfaf" ON "writzsol_session" ("accessToken") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e"`);
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "PK_979e53e64186ccd315cf09b3b14"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "website" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."image" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "websitesId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "websitesId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e" FOREIGN KEY ("websitesId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_account" ADD CONSTRAINT "FK_5986491ee1e50d84d00621a500b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "writzsol_session" ADD CONSTRAINT "FK_4368f6566237ce9029b9122c4d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "writzsol_session" DROP CONSTRAINT "FK_4368f6566237ce9029b9122c4d1"`);
        await queryRunner.query(`ALTER TABLE "provider_account" DROP CONSTRAINT "FK_5986491ee1e50d84d00621a500b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "websitesId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "websitesId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."image" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailVerified" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "PK_979e53e64186ccd315cf09b3b14"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "website" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aeba58f96225bcde26c1d7d138e" FOREIGN KEY ("websitesId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "IDX_fdaf8079fd4289cd8b37c7dfaf"`);
        await queryRunner.query(`DROP INDEX "IDX_a5ea312beda0ee86ed0a272096"`);
        await queryRunner.query(`DROP TABLE "writzsol_session"`);
        await queryRunner.query(`DROP INDEX "IDX_5ebed08ac78d30f9b04a2c4bcb"`);
        await queryRunner.query(`DROP TABLE "verification_request"`);
        await queryRunner.query(`DROP INDEX "IDX_5986491ee1e50d84d00621a500"`);
        await queryRunner.query(`DROP INDEX "IDX_6c51996da812b635605e8a25a4"`);
        await queryRunner.query(`DROP INDEX "IDX_24a7db9399f7218b81e69ec7c1"`);
        await queryRunner.query(`DROP INDEX "IDX_b2e0ffdd9e022df334e25c2089"`);
        await queryRunner.query(`DROP TABLE "provider_account"`);
    }

}
