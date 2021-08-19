import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/infra/typeorm/entities/UserEntity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Permission } from './PermissionEntity';

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

    @ApiProperty()
    @ManyToMany(() => Permission, (permission) => permission.name)
    @JoinTable({
        name: 'roles_permissions',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }],
    })
    public permissions: Permission[];

    @ApiProperty()
    @Column()
    public enabled: boolean;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
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
