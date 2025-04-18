import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
