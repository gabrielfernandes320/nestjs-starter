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
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import hashPassword from '../../../../../shared/utils/hashPassword';
import { Role } from '../../../../roles/infra/typeorm/entities/RoleEntity';

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
    @Exclude({ toPlainOnly: true })
    @Column()
    public password: string;

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
    public async setCreated() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    @BeforeInsert()
    public async setUpdatedAt() {
        this.password = await hashPassword(this.password);
        this.updatedAt = new Date();
    }
}
