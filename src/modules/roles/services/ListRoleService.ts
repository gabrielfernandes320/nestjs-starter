import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../../roles/repositories/IRolesRepository';

@Injectable()
export default class ListRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(): Promise<Role[]> {
        return await this.rolesRepository.findAll();
    }
}
