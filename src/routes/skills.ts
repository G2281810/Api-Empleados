import {SkillsController} from './../controller/SkillsController';
import { Router } from 'express';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();


//Creamos la rutas para nuestras habilidades//
router.get('/',SkillsController.getAll);

//Ruta para una sola habilidad//
router.get('/:idhabilidad', SkillsController.getById);

//Agregar una nueva habilidad//

router.post('/',SkillsController.newSkill);

//Modificar una habilidad//
router.patch('/:idhabilidad', SkillsController.editSkill);

//Eliminar una habilidad//

router.delete('/:idhablidad', SkillsController.deleteSkill);

export default router;