import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';


export class UserController {
    //Mostrar todos los usuarios//
    static getAll = async (req: Request, res:Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();

            if (users.length > 0){
                res.send(users); 
            }else{
                res.status(404).json({message: 'Usuarios no encontrados'});
            }
    };

    //Mostrar solo un usuario//
    static getById = async (req: Request, res:Response) =>{
        const {idusuario} = req.params;

        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(idusuario);
            res.send(user);

        }catch(e){
            res.status(404).json({message: 'No se encontro ningun usuario con ese id'});
        }
    };

    //Agregar un nuevo usuario//
    static newUser = async (req: Request, res:Response) =>{
        const { nombreusuario, appaterno, apmaterno, email, password, role } = req.body;

        const user = new User();
        user.nombreusuario = nombreusuario;
        user.appaterno = appaterno;
        user.apmaterno = apmaterno;
        user.email = email;
        user.password = password;
        user.role = role;

        //Validacion error//
        let validationOp = {validationError:{target: false, value: false}};
        const errors = await validate(user, validationOp);
        if( errors.length >0 ){
            res.send({message:'Error de validación'});
        }

        const userRepository = getRepository(User);
        try{
            user.hashPassword();
            await userRepository.save(user);

        }catch(e){
            res.send({message: 'Verifica tu información'});
        }
        res.send({message:'Usuario Agregado'});
    };

    //Editar un usuario//
    static editUser = async (req: Request, res:Response) =>{
        
        let user:any;

        const {idusuario} = req.params;
        const {nombreusuario, appaterno, apmaterno, email, role} = req.body;
        
        const userRepository = getRepository(User);

        try{

            user = await userRepository.findOneOrFail(idusuario);
            user.nombreusuario = nombreusuario;
            user.appaterno = appaterno;
            user.apmaterno = apmaterno;
            user.email = email;
            user.role = role;

        }catch(e){
            return res.status(404).json({message: 'Usuario no encontrado con esa id'});
        }
        let validationOp = {validationError:{target: false, value: false}};

        const errors = await validate(user, validationOp);

        if( errors.length > 0 ){
            return res.status(400).json(errors);
        }

        //Guardar usuario editado//
        try{
            await userRepository.save(user);

        }catch(e){
            return res.status(409).json({message: 'El correo ya esta registrado'});
        }
            res.status(201).json({message: 'Usuario actualizado'});
    };
    
    //Eliminar un usuario//
    static deleteUser = async (req: Request, res:Response) =>{
        const {idusuario} = req.params;
        const userRepository = getRepository(User);
        let user: User;
        try{
            user = await userRepository.findOneOrFail(idusuario);
    
        }catch(e){
            return res.status(404).json({message: 'Usuario con esa id no encontrado'});
        }
        //Eliminar el usuario//
        userRepository.delete(idusuario);
        res.status(201).json({message: 'Usuario eliminado'});
    };
}

export default UserController;