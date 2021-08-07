import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDTO {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public roles: { id: string }[];

    @IsNotEmpty()
    public password: string;
}
