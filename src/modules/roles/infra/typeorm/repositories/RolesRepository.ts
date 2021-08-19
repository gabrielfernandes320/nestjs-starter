import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListRolesDTO from 'src/modules/roles/dtos/ListRoleDTO';
import IRolesRepository from 'src/modules/roles/repositories/IRolesRepository';
import { ILike, Repository } from 'typeorm';
import { Role } from '../entities/RoleEntity';
import CreateRoleDTO from 'src/modules/roles/dtos/CreateRoleDTO';
import { plainToClass } from 'class-transformer';
import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import RoleNotFoundException from 'src/modules/roles/exceptions/RoleNotFoundException';

@Injectable()
export class RolesRepository implements IRolesRepository {
    public constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    public async create(role: CreateRoleDTO): Promise<Role> {
        const newRole = this.rolesRepository.create(plainToClass(Role, role));

        return await this.rolesRepository.save(newRole);
    }

    public async update(id: number, role: UpdateRoleDTO): Promise<Role> {
        let roleToUpdate = plainToClass(Role, role);

        roleToUpdate.id = id;

        const updatedRole = await this.rolesRepository.save(roleToUpdate);

        if (updatedRole) {
            return updatedRole;
        }

        throw new RoleNotFoundException(id);
    }

    public async findAll(params: ListRolesDTO): Promise<any> {
        const { page, perPage, search, order } = params;

        const [result, total] = await this.rolesRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order },
            take: perPage,
            skip: perPage * (page - 1),
            relations: ['permissions'],
        });

        return {
            value: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }

    public findById(id: number): Promise<Role> {
        return this.rolesRepository.findOne(id, { relations: ['permissions'] });
    }

    public async remove(id: number) {
        const deleted = await this.rolesRepository.softDelete(id);

        if (!deleted.affected) {
            throw new RoleNotFoundException(id);
        }
    }
}
