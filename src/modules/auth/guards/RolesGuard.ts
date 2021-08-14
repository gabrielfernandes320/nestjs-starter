import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import userHasRoles from 'src/shared/utils/userHasRole';
import { Role } from '../enums/RolesEnum';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(
        private reflector: Reflector,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return userHasRoles(user, requiredRoles);
    }
}
