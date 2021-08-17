import { Role } from 'src/modules/roles/infra/typeorm/entities/RoleEntity';
import { Permission as PermissionsEnum } from 'src/modules/auth/enums/PermissionsEnum';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';
import { Permission } from 'src/modules/roles/infra/typeorm/entities/PermissionEntity';

export default function userHasPermission(
    user: User,
    requiredPermissions: PermissionsEnum[],
) {
    if (user !== undefined) {
        const userPermissions = user.roles.map((role: Role) =>
            role.permissions.map(
                (permission: Permission) => permission.reference,
            ),
        );

        let merged = [].concat.apply([], userPermissions);

        return requiredPermissions.some((perm: any) => merged?.includes(perm));
    }

    return true;
}
