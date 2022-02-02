import { Router } from "express";

import auth from './auth';
import user from './user';
import employees from './employees';
import skills from './skills';
const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/employees', employees);
routes.use('/skills', skills);

export default routes;

