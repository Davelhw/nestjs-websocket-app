import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744024964578 implements MigrationInterface {
    name = 'Init1744024964578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`adm_users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`twoFAEnabled\` tinyint NOT NULL DEFAULT 0, \`twoFAVerified\` tinyint NOT NULL DEFAULT 0, \`twoFASecret\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_d499cabe3f40aeefe0ba6fe0d1\` (\`username\`), UNIQUE INDEX \`IDX_193a9e0e0cd862c58a22234709\` (\`twoFASecret\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(36) NOT NULL, \`module\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`adm_users_roles_roles\` (\`admUsersId\` varchar(36) NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_40f59be1c10c44a979719851d1\` (\`admUsersId\`), INDEX \`IDX_fee17ae339f6b9ebcec0968fa0\` (\`rolesId\`), PRIMARY KEY (\`admUsersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_permissions_permissions\` (\`rolesId\` int NOT NULL, \`permissionsId\` varchar(36) NOT NULL, INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` (\`rolesId\`), INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` (\`permissionsId\`), PRIMARY KEY (\`rolesId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`adm_users_roles_roles\` ADD CONSTRAINT \`FK_40f59be1c10c44a979719851d1c\` FOREIGN KEY (\`admUsersId\`) REFERENCES \`adm_users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`adm_users_roles_roles\` ADD CONSTRAINT \`FK_fee17ae339f6b9ebcec0968fa0d\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_dc2b9d46195bb3ed28abbf7c9e3\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_fd4d5d4c7f7ff16c57549b72c6f\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_fd4d5d4c7f7ff16c57549b72c6f\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_dc2b9d46195bb3ed28abbf7c9e3\``);
        await queryRunner.query(`ALTER TABLE \`adm_users_roles_roles\` DROP FOREIGN KEY \`FK_fee17ae339f6b9ebcec0968fa0d\``);
        await queryRunner.query(`ALTER TABLE \`adm_users_roles_roles\` DROP FOREIGN KEY \`FK_40f59be1c10c44a979719851d1c\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_fee17ae339f6b9ebcec0968fa0\` ON \`adm_users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_40f59be1c10c44a979719851d1\` ON \`adm_users_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`adm_users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_193a9e0e0cd862c58a22234709\` ON \`adm_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_d499cabe3f40aeefe0ba6fe0d1\` ON \`adm_users\``);
        await queryRunner.query(`DROP TABLE \`adm_users\``);
    }

}
