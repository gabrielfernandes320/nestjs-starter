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
import CreateRoleDTO from '../../dtos/CreateRoleDTO';
import ListRoleDTO from '../../dtos/ListRoleDTO';
import UpdateRoleDTO from '../../dtos/UpdateRoleDTO';
import CreateRoleService from '../../services/CreateRoleService';
import DeleteRoleService from '../../services/DeleteRoleService';
import ListRoleService from '../../services/ListRoleService';
import ShowRoleService from '../../services/ShowRoleService';
import UpdateRoleService from '../../services/UpdateRoleService';

@UseGuards(JwtAuthenticationGuard)
@Controller('roles')
export class RolesController {
    public constructor(
        private createRoleService: CreateRoleService,
        private deleteRoleService: DeleteRoleService,
        private listRoleService: ListRoleService,
        private showRoleService: ShowRoleService,
        private updateRoleService: UpdateRoleService,
    ) {}

    @Post()
    public create(@Body() createRoleDto: CreateRoleDTO) {
        return this.createRoleService.execute(createRoleDto);
    }

    @Get()
    public findAll(@Query() query: ListRoleDTO) {
        return this.listRoleService.execute(query);
    }

    @Get(':id')
    public findOne(@Param('id') id: number) {
        return this.showRoleService.execute(id);
    }

    @Patch(':id')
    public update(
        @Param('id') id: number,
        @Body() updateRoleDto: UpdateRoleDTO,
    ) {
        return this.updateRoleService.execute(id, updateRoleDto);
    }

    @Delete(':id')
    public remove(@Param('id') id: number) {
        return this.deleteRoleService.execute(id);
    }
}
