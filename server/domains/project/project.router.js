// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET /project/projects
//  GET /project/dashboard
router.get(['/projects', '/dashboard'], projectController.showDashboard);

// GET /project/add-form
// GET /project/adda
router.get(['/add-form', '/add'], projectController.addForm);

// POST "/project/add"
router.post('/add', projectController.addPost);

// Exporto este tramo de ruta
export default router;
