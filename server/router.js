// Importando enrutador home
import homeRouter from './domains/home/home.router';
import userRouter from './domains/user/user.router';
import userProject from './domains/project/project.router';
// Función que agrega rutas
const addRoutes = (app) => {
  // Agregando enrutado de Home
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  app.use('/', userProject);
  app.use('/projects', userProject);
  return app;
};

// Exportando objeto
export default { addRoutes };
