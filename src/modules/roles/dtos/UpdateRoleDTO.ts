import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateUserDTO {
    @IsNotEmpty()
    public id: string | number;

    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public reference: string;

    @IsNotEmpty()
    public permissions: { id: string }[];
}
