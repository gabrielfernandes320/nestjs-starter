import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/http/UsersController';
import ShowRoleService from './services/ShowRoleService';
import ListRoleService from './services/ListRoleService';
import DeleteRoleService from './services/DeleteRoleService';
import SaveRoleService from './services/SaveRoleService';
import { Role } from './infra/typeorm/entities/RoleEntity';
import providers from './providers';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [
        ...[
            ShowRoleService,
            SaveRoleService,
            ListRoleService,
            DeleteRoleService,
        ],
        ...providers,
    ],
    controllers: [UsersController],
    exports: providers,
})
export class RolesModule {}
