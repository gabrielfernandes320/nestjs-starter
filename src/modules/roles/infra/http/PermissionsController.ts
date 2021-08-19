import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/modules/auth/guards/JwtAuthenticationGuard';
import ListPermissionDTO from '../../dtos/ListPermissionDTO';
import ListPermissionService from '../../services/ListPermissionService';

@UseGuards(JwtAuthenticationGuard)
@Controller('permissions')
export class PermissionsController {
    public constructor(private listPermissionService: ListPermissionService) {}

    @Get()
    public findAll(@Query() query: ListPermissionDTO) {
        return this.listPermissionService.execute(query);
    }
}
