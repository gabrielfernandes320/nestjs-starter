import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class GenerateRoleByReferenceService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(reference: string): Promise<Role> {
        let role = await this.rolesRepository.findByReference(reference);

        if (!role) {
            role = await this.rolesRepository.save({
                name: reference,
                reference: reference,
            });
        }

        return role;
    }
}
