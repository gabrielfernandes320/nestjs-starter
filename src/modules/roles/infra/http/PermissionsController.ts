import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import ListPermissionDTO from '../../dtos/ListPermissionDTO';
import ListPermissionService from '../../services/ListPermissionService';

@UseGuards(JwtAuthenticationGuard)
@Controller('permissions')
export class PermissionsController {
    public constructor(private listPermissionService: ListPermissionService) {}

    @Get()
    public findAll(@Query() query: any) {
        return this.listPermissionService.execute(query);
    }
}
