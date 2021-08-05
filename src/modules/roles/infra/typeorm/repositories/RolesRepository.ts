import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SaveRoleDTO from 'src/modules/roles/dtos/SaveRoleDTO';
import IRolesRepository from 'src/modules/roles/repositories/IRolesRepository';
import { Repository } from 'typeorm';
import { Role } from '../entities/RoleEntity';

@Injectable()
export class RolesRepository implements IRolesRepository {
    public constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    public findAll(): Promise<Role[]> {
        return this.rolesRepository
            .createQueryBuilder('roles')
            .orderBy('roles.name', 'ASC')
            .select(['id AS value', 'name AS label'])
            .getRawMany();
    }

    public findById(id: number): Promise<Role> {
        return this.rolesRepository.findOne(id, { where: { deletedAt: null } });
    }

    public async remove(id: number) {
        const role = await this.findById(<any>id);

        role.deletedAt = new Date();

        await this.rolesRepository.save(role);
    }

    public async save(roleDto: SaveRoleDTO): Promise<Role> {
        const role = new Role();

        role.id = <number>roleDto.id;
        role.name = roleDto.name;
        role.reference = roleDto.reference;

        return this.rolesRepository.save(role);
    }

    public async findByReference(reference: string): Promise<Role> {
        return this.rolesRepository.findOne({
            where: { reference: reference, deletedAt: null },
        });
    }
}
