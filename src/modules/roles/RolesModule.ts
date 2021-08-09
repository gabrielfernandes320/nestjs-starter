import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './infra/http/RolesController';
import ShowRoleService from './services/ShowRoleService';
import ListRoleService from './services/ListRolesService';
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
    controllers: [RolesController],
    exports: providers,
})
export class RolesModule {}
