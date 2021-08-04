import { Role } from 'src/modules/users/infra/typeorm/entities/RoleEntity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    @Index({ unique: true })
    public email: string;

    @ApiProperty()
    @Column()
    public password: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    public deletedAt?: Date;

    @ApiProperty()
    @ManyToMany(() => Role, (role) => role.name)
    @JoinTable({
        name: 'user_roles',
        joinColumns: [{ name: 'user_id' }],
        inverseJoinColumns: [{ name: 'role_id' }],
    })
    public roles: Role[];

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
