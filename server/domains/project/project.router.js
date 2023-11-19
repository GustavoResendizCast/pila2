// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Importando factory de validacion
import ValidateFactory from '../../services/validateFactory';
// Importando el validador de proyecto
import projectValidator from './project.validator';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET /project/projects
//  GET /project/dashboard
router.get(['/projects', '/showDashboard'], projectController.showDashboard);

// GET /project/add-form
// GET /project/adda
router.get(['/add-form', '/add'], projectController.addForm);

// POST "/project/add"
router.post(
  '/add',
  ValidateFactory({
    schema: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectController.addPost,
);

// Exporto este tramo de ruta
export default router;
