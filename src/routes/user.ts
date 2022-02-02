import { UserController } from "./../controller/UserController";
import {Router} from 'express';
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";
const router = Router();

//Crearemos todas nuestras rutas para nuestro usuarios que solo pueden ser vistas por adminstradores//

//Ruta para mostrar todos nuestros usuarios//
router.get('/', UserController.getAll);

//Ruta para mostrar un solo usuario//
router.get('/:idusuario', [checkJwt], UserController.getById);

//Ruta para crear un nuevo usuario//
router.post('/', UserController.newUser);

//Ruta para editar un usuario//
router.patch('/:idusuario', [checkJwt, checkRole(['admin'])], UserController.editUser);

//Ruta para eliminar un usuario//
router.delete('/:idusuario',  [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;