import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsDate,MaxLength} from "class-validator";
import * as bcrypt from 'bcryptjs';
import { Skills } from "./skills";

@Entity()
@Unique(['idempleado'])

export class Employees{
    @PrimaryGeneratedColumn()
    idempleado: number;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    nombreempleado:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    appaterno:string;

    @Column()
    @IsNotEmpty()
    apmaterno:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    email:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(255)
    password:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    puesto:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    fecha_n:string;

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    domicilio:string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    //Creamos la relación con la tabla para la llave foranea//
    @OneToMany(()=>Skills, (skills) => skills.employee,{ cascade:true })
    skills: Skills[];

    hashPassword():void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password:string):boolean{
        return bcrypt.compareSync(password, this.password);
    }
}