import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import ListRolesDTO from '../dtos/ListRoleDTO';
import CreateRoleDTO from '../dtos/CreateRoleDTO';
import { Role } from '../infra/typeorm/entities/RoleEntity';

export default interface IRolesRepository {
    findAll(params: ListRolesDTO): Promise<Role[]>;

    findById(id: number): Promise<Role>;

    remove(id: number): Promise<void>;

    create(user: CreateRoleDTO): Promise<Role>;

    update(id: number, user: UpdateRoleDTO): Promise<Role>;
}
