import { IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateUserDTO {
    @IsNotEmpty()
    public id: number | string;

    @IsNotEmpty() public name?: string;
    @IsNotEmpty() public email?: string;
    @IsOptional() public roles?: { id: string }[];
    @IsNotEmpty() public enabled: boolean;
    @IsOptional() public password?: string;
    @IsOptional() public createdAt: Date;
    @IsOptional() public updatedAt?: Date;
    @IsOptional() public deletedAt?: Date;
}
