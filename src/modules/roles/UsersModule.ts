import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/http/UsersController';
import { User } from './infra/typeorm/entities/UserEntity';
import ShowUserService from './services/ShowUserService';
import CreateUserService from './services/CreateUserService';
import ListUserService from './services/ListUserService';
import DeleteUserService from './services/DeleteUserService';
import ShowRoleService from './services/ShowRoleService';
import ListRoleService from './services/ListRoleService';
import DeleteRoleService from './services/DeleteRoleService';
import SaveRoleService from './services/SaveRoleService';
import { Role } from './infra/typeorm/entities/RoleEntity';
import providers from './providers';
import ValidateUserEmailService from './services/ValidateUserEmailService';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [
        ...[
            ShowUserService,
            CreateUserService,
            ListUserService,
            DeleteUserService,
            ShowRoleService,
            SaveRoleService,
            ListRoleService,
            DeleteRoleService,
            ValidateUserEmailService,
        ],
        ...providers,
    ],
    controllers: [UsersController],
    exports: providers,
})
export class UsersModule {}
