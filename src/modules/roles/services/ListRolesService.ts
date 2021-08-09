import { Inject, Injectable } from '@nestjs/common';
import ListRolesDTO from '../dtos/ListRolesDTO';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class ListRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(params: ListRolesDTO): Promise<Role[]> {
        return await this.rolesRepository.findAll(params);
    }
}
