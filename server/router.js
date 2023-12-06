// Importando enrutador home
import homeRouter from './domains/home/home.router';
import userRouter from './domains/user/user.router';
import userProject from './domains/project/project.router';

// Importando el factory de autorizacion
import AuthFactory from './services/authorizationFactory';
// Función que agrega rutas
const addRoutes = (app) => {
  // Agregando enrutado de Home
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  app.use('/', userProject);
  app.use('/project', AuthFactory('user'), userProject);
  return app;
};

// Exportando objeto
export default { addRoutes };
