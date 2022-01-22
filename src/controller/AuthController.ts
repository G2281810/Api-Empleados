import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import {validate} from 'class-validator';

class AuthController {
    //Para el login vamos a solicitar todo lo que venga del body//
    static login = async (req: Request, res: Response) =>{
        const { email, password } = req.body;

        //Validación para que el email y el password sean requeridos//
        if( !(email && password) ){
            res.send({message: 'El correo y contraseña son requeridos'});
        }else{

            const userRepository = getRepository(User);
            let user: User;

            try{
                user = await userRepository.findOneOrFail({ where:{email}});

            }catch(e) {
                res.send({message: 'Correo o contraseña incorrectos'});
                
            }

            //Verificar que el password encriptado y la contraseña ingresada son las mismas//
            if( !user.checkPassword(password) && user.checkPassword(password)==null ){
                res.send(400);
                res.send({message: 'Correo o contraseña no coinciden'});
            }

            //Creamos el JWT con la información de nuestro usuario//
            const token = jwt.sign({ userId: user.idusuario, email: user.email}, config.jwtSecret, {expiresIn: '1hr'});
            res.json({message:'Logueado correctamente', token});
        };
        
    };

    static changePassword = async (req: Request, res:Response) =>{

        const { userId } = res.locals.jwtPayload;
        const {oldPassword, newPassword } = req.body;

        if( !oldPassword && newPassword ){
            res.status(400).json({message: 'Verifica tus contraseñas' });
        }
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(userId);
        }catch(e){
            res.status(400).json({message:'Algo salio mal'});
        }
        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'Verifica tus contraseñas'});

        }
        user.password = newPassword;

        let validationOp = {validationError:{target: false, value: false}};

        const errors = await validate(user,validationOp);

        if( errors.length > 0){
            return res.status(400).json(errors);
        }

        //Hacer nuevamente el hash a la contraseña nueva//
        user.hashPassword();
        userRepository.save(user);
        res.json({message: 'Tu contraseña se cambio correctamente'});
    };
}

//Exportamos nuestro AuthController/7
export default AuthController;
