/* eslint-disable brace-style */
/* eslint-disable indent */
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class createRolesPermissionsTable1629153044303
    implements MigrationInterface
{
    public TABLE_NAME = 'roles_permissions';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.TABLE_NAME,
                columns: [
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'role_id',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            this.TABLE_NAME,
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            this.TABLE_NAME,
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
