import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../../roles/repositories/IRolesRepository';

@Injectable()
export default class ShowRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(roleId): Promise<Role> {
        const Role = await this.rolesRepository.findById(roleId);

        return Role;
    }
}
