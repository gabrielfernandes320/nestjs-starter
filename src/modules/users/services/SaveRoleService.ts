import { Inject, Injectable } from '@nestjs/common';
import SaveRoleDTO from '../dtos/SaveRoleDTO';
import { Role } from '../../users/infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../../users/repositories/IRolesRepository';

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
