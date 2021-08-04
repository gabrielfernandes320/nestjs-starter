export default class UpdateUserDTO {
    public id: number | string;
    public name?: string;
    public email?: string;
    public role?: string;
    public password?: string;
    public createdAt: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}
