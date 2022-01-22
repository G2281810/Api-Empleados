import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Employees } from "../entity/Employee";
import { validate } from "class-validator";
import { userInfo } from "os";

export class EmployeesController{
    //Mostrar todos los empleados//
    static getAll = async(req: Request, res:Response) => {
        const empRepository = getRepository(Employees);
        const employees = await empRepository.find();

            if(employees.length > 0){
                res.status(200);
                res.send(employees);
            }else{
                res.status(404).send({message: 'Empleados no encontrados'});
            }
    };

    //Mostrando un solo empleado//
    static getById = async (req: Request, res:Response) => {
        const {idempleado} = req.params;

        const empRepository = getRepository(Employees);

        try{
            const employee = await empRepository.findOneOrFail(idempleado);
            res.status(200);
            res.send(employee);
        }catch(e){
            res.status(404).json({message: 'No se encotro el empleado con esa id'});
        }
    };

    static newEmployee = async (req: Request, res:Response) =>{
        const {nombreempleado,appaterno,apmaterno,email,password,puesto,fecha_n,domicilio,} = req.body;

        const employee = new Employees();
        employee.nombreempleado = nombreempleado;
        employee.appaterno = appaterno;
        employee.apmaterno = apmaterno;
        employee.email = email;
        employee.password = password;
        employee.puesto = puesto;
        employee.fecha_n = fecha_n;
        employee.domicilio = domicilio;
        
        //Validación de error//
        let validationOp = {validationError:{target: false, value: false}};
        const errors = await validate(employee, validationOp);

        if (errors.length > 0) { 
            res.status(200).send({message:"Verifica tu información"});
        }else{
            const empRepository = getRepository(Employees);
            employee.hashPassword();
            await empRepository.save(employee);
            res.status(200).send({message: "Empleado Agregado correctamente"});
        }
    };

    //Editar empleado//

    static editEmployee = async(req:Request, res:Response) =>{
        let employee:any;

        const {idempleado} = req.params;
        const {nombreempleado,appaterno,apmaterno,email,password,puesto,fecha_n,domicilio}  = req.body;

        const empRepository = getRepository(Employees);

        try{
            employee = await empRepository.findOneOrFail(idempleado);
            employee.nombreempleado = nombreempleado;
            employee.appaterno = appaterno;
            employee.apmaterno = apmaterno;
            employee.email = email;
            employee.password = password;
            employee.puesto = puesto;
            employee.fecha_n = fecha_n;
            employee.domicilio = domicilio;
        }catch(e){
            return res.status(404).json({message:'Empleados no encontrados'});
        }
        //Validación//
        let validatinOp = {validationError:{target: false, value: false}};
        const errors = await validate(employee,validatinOp);

        if(errors.length > 0){
            res.status(400).send({message:'Error verifica'});
        }else{
            await empRepository.save(employee);
        res.status(200).send({message:'Empleado Actualizado'});
        }

    };

    static deleteEmployee = async(req:Request, res:Response) =>{
        const {idempleado} = req.params;
        const empRepository = getRepository(Employees);
        let employees: Employees;
        try{
            employees = await empRepository.findOneOrFail(idempleado);
        }catch(e){
            res.send({message:'Usuario con esa id no encontrado'});
        }
        empRepository.delete(idempleado);
        res.send({message:'Usuario eliminado correctamente'});
    };
}

export default EmployeesController;