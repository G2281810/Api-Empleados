import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt =(req: Request, res:Response, next:NextFunction)=>{
    
    const token = <string>req.headers['auth'];
    let jwtPayload:any;

    try{

        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;

    }catch(e){
        return res.status(401).json({message:'Ruta protegida favor inicia sesión'});
    }

    const {UserId, email} = jwtPayload;

    const newToken = jwt.sign({ UserId, email}, config.jwtSecret, {expiresIn: '1h'} );
    res.setHeader('token', newToken);
    next();

};
