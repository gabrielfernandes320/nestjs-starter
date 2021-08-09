import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import ListRolesDTO from '../../dtos/ListRolesDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import ListRoleService from '../../services/ListRolesService';

@Controller('roles')
export class RolesController {
    public constructor(private listRoleService: ListRoleService) {}

    @Get()
    public findAll(@Query() query: ListRolesDTO) {
        return this.listRoleService.execute(query);
    }

    @Get(':id')
    public findOne(@Param('id') id: number) {
        //return this.usersService.findOne(+id);
    }

    @Patch(':id')
    public update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ) {
        //return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    public remove(@Param('id') id: number) {
        // return this.usersService.remove(+id);
    }
}
