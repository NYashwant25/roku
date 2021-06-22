import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('userList')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uuid : number

    @Column()
    r_full_name : string;
  
    @Column({nullable : true})
    r_password : string;
  
    @Column()
    @IsEmail()
    r_email: string;

    @CreateDateColumn({type: "timestamp"})
    created_at : Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at : Date

}