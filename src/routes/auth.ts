import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Ruta para nuestro login//

router.post('/login',AuthController.login);

//Ruta para poder cambiar la contraseña//
router.post('/change-pass', [checkJwt, checkRole(['admin'])], AuthController.changePassword);

//Exportando router//
export default router;