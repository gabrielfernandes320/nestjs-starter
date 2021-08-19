import ListPermissionsDTO from '../dtos/ListPermissionDTO';
import { Permission } from '../infra/typeorm/entities/PermissionEntity';

export default interface IPermissionsRepository {
    findAll(params: ListPermissionsDTO): Promise<Permission[]>;
}
