// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/projects/project'
router.get('/project', projectController.project);

// GET '/project/dashboard'
router.get('/dashboard', projectController.dashboard);

// GET '/project/add-form'
router.get('/add-form', projectController.addform);

// GET '/project/add'
router.get('/dashboard', projectController.dashboard);

// Exporto este tramo de ruta
export default router;
