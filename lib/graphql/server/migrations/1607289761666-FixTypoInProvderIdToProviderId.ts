import {MigrationInterface, QueryRunner} from "typeorm";

export class FixTypoInProvderIdToProviderId1607289761666 implements MigrationInterface {
    name = 'FixTypoInProvderIdToProviderId1607289761666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_24a7db9399f7218b81e69ec7c1"`);
        await queryRunner.query(`ALTER TABLE "provider_account" RENAME COLUMN "provderId" TO "providerId"`);
        await queryRunner.query(`CREATE INDEX "IDX_b142d2baa809d7d2cecce107e7" ON "provider_account" ("providerId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b142d2baa809d7d2cecce107e7"`);
        await queryRunner.query(`ALTER TABLE "provider_account" RENAME COLUMN "providerId" TO "provderId"`);
        await queryRunner.query(`CREATE INDEX "IDX_24a7db9399f7218b81e69ec7c1" ON "provider_account" ("provderId") `);
    }

}
