import { Router } from "express";

import auth from './auth';
import user from './user';
import employees from './employees';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/employees', employees);

export default routes;

