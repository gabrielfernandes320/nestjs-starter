import { Inject, Injectable } from '@nestjs/common';
import SaveRoleDTO from '../dtos/SaveRoleDTO';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../../roles/repositories/IRolesRepository';

@Injectable()
export default class SaveRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(roleDto: SaveRoleDTO): Promise<Role> {
        return await await this.rolesRepository.save(roleDto);
    }
}
