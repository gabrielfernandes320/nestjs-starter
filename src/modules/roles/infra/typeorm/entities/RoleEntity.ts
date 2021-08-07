import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public reference: string;

    // @OneToMany(() => User, (user: User) => user.role)
    // public users: User[];

    @ApiProperty()
    @Column({ name: 'created_at' })
    public createdAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    public updatedAt: Date;

    @ApiProperty()
    @Column({ name: 'deleted_at', nullable: true })
    public deletedAt: Date;

    @BeforeInsert()
    public setCreated() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    @BeforeInsert()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
