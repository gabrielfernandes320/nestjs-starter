import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDTO {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    //public roleId: number;
    @IsNotEmpty()
    public password: string;
}
