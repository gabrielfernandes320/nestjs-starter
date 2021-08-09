import { Ordering } from '../enums/Ordering';
import { IsEnum, IsOptional } from 'class-validator';

export default class ListParamsDTO {
    @IsOptional()
    @IsEnum(Ordering, {
        message: `order must be a valid enum value. Valid options are: '${Ordering.ASC}' | '${Ordering.DESC}'`,
    })
    public order?: Ordering = Ordering.ASC;

    public page?: number = 1;

    public perPage?: number = 10;

    public search?: string;
}
