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
import { TransformClassToPlain } from 'class-transformer';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import ListUserDTO from '../../dtos/ListUserDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import CreateUserService from '../../services/CreateUserService';
import DeleteUserService from '../../services/DeleteUserService';
import ListUserService from '../../services/ListUserService';
import ShowUserService from '../../services/ShowUserService';
import UpdateUserService from '../../services/UpdateUserService';

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
    public create(@Body() createUserDto: CreateUserDTO) {
        return this.createUserService.execute(createUserDto);
    }

    @Get()
    public findAll(@Query() query: ListUserDTO) {
        return this.listUserService.execute(query);
    }

    @Get(':id')
    @TransformClassToPlain()
    public findOne(@Param('id') id: number) {
        return this.showUserService.execute(id);
    }

    @Patch(':id')
    public update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ) {
        return this.updateUserService.execute(id, updateUserDto);
    }

    @Delete(':id')
    public remove(@Param('id') id: number) {
        return this.deleteUserService.execute(id);
    }
}
