import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import CreateUserService from '../../services/CreateUserService';

@Controller('users')
export class UsersController {
    public constructor(private createUserService: CreateUserService) {}

    @Post()
    public create(@Body() createUserDto: CreateUserDTO) {
        return this.createUserService.execute(createUserDto);
    }

    @Get()
    public findAll() {
        // return this.usersService.findAll();
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
