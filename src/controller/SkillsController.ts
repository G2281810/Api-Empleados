import { getRepository } from "typeorm";
import { Response, Request } from "express";
import { Skills } from "../entity/skills";
import {validate} from 'class-validator';

export class SkillsController{
    //Mostrando todas las habilidades//
    static getAll = async(req:Request, res:Response) => {
        const skillRepository = getRepository(Skills);

        const skills = await skillRepository.find();

        if (skills.length > 0){
            res.status(200);
            res.send(skills);
        }else{
            res.status(404);
            res.send({message: 'Habilidades no encontradas'});
        }
    };

    static getById = async (req:Request, res:Response) => {
        const {idhabilidad} = req.params;

        const skillRepository = getRepository(Skills)

        try{
            const skills = await skillRepository.findOneOrFail(idhabilidad);
            res.status(200);
            res.send(skills);
        }catch(e){
            res.status(404);
            res.send({message:'Habilidad no encontrada con ese id'});
        }
    };

    static newSkill = async(req:Request, res:Response) => {
        let {habilidades,calificacion,idempleado} = req.body;

        let skills = new Skills();
        skills.habilidades = habilidades;
        skills.calificacion = calificacion;
        skills.employee = idempleado;

        let validationOp = {validationError:{target:false, value:false}};
        const errors = await validate(skills, validationOp);

        if(errors.length > 0){
            res.status(400);
            res.send(errors);
        }else{
            let skillRepository = getRepository(Skills);
            await skillRepository.save(skills);
            res.status(200).send({message:"Habilidad agregada correctamente"});
        }
    };

    static editSkill = async(req:Request, res:Response) => {
        let skill:any;

        let {idhabilidad} = req.params;
        let {habilidades,calificacion,idempleado} = req.body;
        let skillRepository = getRepository(Skills);

        try{
            skill = await skillRepository.findOneOrFail(idhabilidad);
            skill.habilidades = habilidades;
            skill.calificacion = calificacion;
            skill.employee = idhabilidad;
        }catch(e){
            res.status(404);
            res.send({message:'Habilidades no encontradas'});
        }
        let validationOp = {validationError:{target: false, value:false}};
        const errors = await validate(skill,validationOp);

        if(errors.length > 0){
            res.status(400);
            res.send({message:'Error verifica'});
        }else{
            await skillRepository.save(skill);
            res.status(200);
            res.send({message:'Empleado Actualizado'});
        }
    };

    static deleteSkill = async(req:Request, res:Response) => {
        const {idhabilidad} = req.params;
        const skillRepository = getRepository(Skills);
        let skills: Skills;
        try{
            skills = await skillRepository.findOneOrFail(idhabilidad);

        }catch(e){
            res.status(404);
            res.send({message:'Habilidad no encontrada con ese id'});
        }
        skillRepository.delete(idhabilidad);
        res.send({message:'Habilidad eliminada actualiza la pagina'});
    };

}

export default SkillsController