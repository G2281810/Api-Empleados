import { Router } from "express";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import {EmployeesController} from './../controller/EmployeesController'

const router = Router();

//Creamos todas las rutas a utilizar para nuestros empleados//

//Listado de todos los empleados//
router.get('/',[checkJwt],EmployeesController.getAll);

//Ruta para mostrar un solo empleado//
router.get('/:idempleado',[checkJwt],EmployeesController.getById);
//Ruta para crear un nuevo empleado//
router.post('/',[checkJwt], EmployeesController.newEmployee);
//Ruta para editar un empleado//
router.patch('/:idempleado',[checkJwt],EmployeesController.editEmployee);
//ruta para eliminar un empleado//
router.delete('/:idempleado',[checkJwt], EmployeesController.deleteEmployee);

export default router;