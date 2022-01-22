import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, MaxLength} from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])

export class User{
    @PrimaryGeneratedColumn()
    idusuario: number; 

    @Column()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    nombreusuario:string;

    @Column()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    appaterno:string;

    @Column()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    apmaterno:string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Column()
    @MinLength(5)
    @IsNotEmpty()
    password:string;

    @Column()
    @IsNotEmpty()
    role:string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    //Encriptando contraseña con hash//
    hashPassword():void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string):boolean {
        return bcrypt.compareSync(password, this.password);
    }
}