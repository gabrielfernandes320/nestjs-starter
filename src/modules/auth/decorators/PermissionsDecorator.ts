import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/PermissionsEnum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Array<Permission>) =>
    SetMetadata(PERMISSIONS_KEY, permissions);
