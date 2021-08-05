import { Ordering } from '../enums/Ordering';
import { IsEnum } from 'class-validator';

export default class ListParamsDTO {
    @IsEnum(Ordering, {
        message: `order must be a valid enum value. Valid options are: '${Ordering.ASC}' | '${Ordering.DESC}'`,
    })
    public order?: Ordering;

    public page: number;

    public perPage: number;

    public search?: string;
}
