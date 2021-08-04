import SaveRoleDTO from '../dtos/SaveRoleDTO';
import { Role } from '../infra/typeorm/entities/RoleEntity';

export default interface IRolesRepository {
  findAll(): Promise<Role[]>;

  findById(id: string): Promise<Role>;

  remove(id: number): Promise<void>;

  save(role: SaveRoleDTO): Promise<Role>;

  findByReference(reference: string): Promise<Role>;
}
