import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Employees } from "../entity/Employee";
import { validate } from "class-validator";
import { Skills } from "../entity/skills";


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
        const skillRepository = getRepository(Skills);
        
            const employee = await empRepository.findOneOrFail(idempleado);
            employee.skills = await skillRepository.find({where:{employee:idempleado}})

        try{
            res.status(200);
            res.send(employee);
            
        }catch(e){
            res.status(404).json({message: 'No se encotro el empleado con esa id'});
        }
    };

    static newEmployee = async (req: Request, res:Response) =>{
        const {nombreempleado,appaterno,apmaterno,email,password,puesto,fecha_n,domicilio} = req.body;

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
            res.send({message:"Verifica tu información"});
        }else{
            const empRepository = getRepository(Employees);
            const skillRepository = getRepository(Skills)
            employee.hashPassword();
            await empRepository.save(employee);
            console.log('dataasd',req.body);
            console.log('employee',employee);

            const skills = req.body.habilidades;
            console.log(skills.habilidades);
            
            console.log(skills);
            skills.forEach(element => {
                console.log(element);
                const skill = new Skills();
                skill.habilidades = element.habilidades;
                skill.calificacion=element.calificacion;
                skill.employee=employee.idempleado;
                skillRepository.save(skill);
            });
            res.status(200).send({message: "Empleado Agregado correctamente"});
        }
    };

    //Editar empleado//

    static editEmployee = async(req:Request, res:Response) =>{
        let employee:any;
        let skill:any;
        const {idempleado} = req.params;
        const {nombreempleado,appaterno,apmaterno,email,password,puesto,fecha_n,domicilio,habilidades}  = req.body;

        const empRepository = getRepository(Employees);
        const skillRepository = getRepository(Skills);
        

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

            skill =  await skillRepository.findOne({where:{employee:idempleado}})
            let skillupdate = req.body.habilidades;
            console.log('viejas',skill)
            console.log('nuevas',skillupdate);
           
            skillupdate.forEach(async element => {
                console.log('antes',skill.habilidades);
                console.log('antes',skill.calificacion);
                console.log('cambia por',element.habilidades);
                console.log('cambia por',element.calificacion);

                skill.habilidades = element.habilidades;
                skill.calificacion = element.calificacion;
                console.log('despues',skill.habilidades);
                console.log('despues',skill.calificacion);
                await skillRepository.save(skill);
            });
            

        }catch(e){
            return res.status(404).json({message:'Empleados no encontrados'});
        }
        //Validación//
        let validatinOp = {validationError:{target: false, value: false}};
        const errors = await validate(employee,validatinOp);

        if(errors.length > 0){
            res.send({message:'Error verifica'});
        }else{
            employee.hashPassword();
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
            empRepository.delete(idempleado);
            res.send({message:'Usuario eliminado correctamente actualiza la pagina'});
            
        }catch(e){
            res.send('No se ah encontrado un empleado con esa id');
        }
        
    };

    
}

export default EmployeesController;
