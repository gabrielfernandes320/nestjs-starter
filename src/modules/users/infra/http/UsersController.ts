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
import { TransformClassToPlain } from 'class-transformer';
import { Permissions } from 'src/modules/auth/decorators/PermissionsDecorator';
import { Permission } from 'src/modules/auth/enums/PermissionsEnum';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import { PermissionsGuard } from 'src/modules/auth/guards/PermissionsGuard';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import ListUserDTO from '../../dtos/ListUserDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import CreateUserService from '../../services/CreateUserService';
import DeleteUserService from '../../services/DeleteUserService';
import ListUserService from '../../services/ListUserService';
import ShowUserService from '../../services/ShowUserService';
import UpdateUserService from '../../services/UpdateUserService';

@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UsersController {
    public constructor(
        private createUserService: CreateUserService,
        private deleteUserService: DeleteUserService,
        private listUserService: ListUserService,
        private showUserService: ShowUserService,
        private updateUserService: UpdateUserService,
    ) {}

    @Post()
    public async create(@Body() createUserDto: CreateUserDTO) {
        return await this.createUserService.execute(createUserDto);
    }

    @Permissions(Permission.ListUsers)
    @UseGuards(PermissionsGuard)
    @Get()
    public async findAll(@Query() query: ListUserDTO) {
        return await this.listUserService.execute(query);
    }

    @Get(':id')
    @TransformClassToPlain()
    public async findOne(@Param('id') id: number) {
        return await this.showUserService.execute(id);
    }

    @Patch(':id')
    public async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ) {
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Delete(':id')
    public async remove(@Param('id') id: number) {
        return await this.deleteUserService.execute(id);
    }
}
