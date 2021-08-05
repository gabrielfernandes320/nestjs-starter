import { ApiProperty } from '@nestjs/swagger';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
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
