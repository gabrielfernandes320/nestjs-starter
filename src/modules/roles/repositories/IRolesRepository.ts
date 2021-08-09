import ListRolesDTO from '../dtos/ListRolesDTO';
import SaveRoleDTO from '../dtos/SaveRoleDTO';
import { Role } from '../infra/typeorm/entities/RoleEntity';

export default interface IRolesRepository {
    findAll(params: ListRolesDTO): Promise<Role[]>;

    findById(id: number): Promise<Role>;

    remove(id: number): Promise<void>;

    save(role: SaveRoleDTO): Promise<Role>;

    findByReference(reference: string): Promise<Role>;
}
