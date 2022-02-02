import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, MaxLength} from "class-validator";
import { Employees } from "./Employee";

@Entity()

export class Skills{

    @PrimaryGeneratedColumn()
    idhabilidad: number; 

    @Column()
    @MaxLength(15)
    @IsNotEmpty()
    habilidades:string;

    @Column()
    @MaxLength(1)
    @IsNotEmpty()
    calificacion:number;

    
    @IsNotEmpty()

    @ManyToOne(()=>Employees, (employees)=> employees.skills,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'idempleado' })
    employee:Employees|number;
    

    //LLave foranea uno a muchos//
}