// Importing winston logger
import log from '../../config/winston';

// Importando el modelo
import ProjectModel from './project.model';

// Importando Httperrors

// Actions methods
// GET "/project"
// GET "/project"
const showDashboard = async (req, res) => {
  // Consultado todos los proyectos
  const projects = await ProjectModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  log.info('Se entrega dashboard de proyectos');
  res.render('project/dashboardView', { projects });
};

// GET "/project/add"
const add = (req, res) => {
  res.render('project/addView');
};

// POST "/project/add"
const addPost = async (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add Project');
    // Se desestructuran los datos de validación
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/addView', { project, errorModel });
  }
  // En caso de que pase la validación
  // Se desestructura la información
  // de la peticion
  const { validData: project } = req;
  try {
    // Creando la instancia de un documento
    // con los valores de 'project'
    const savedProject = await ProjectModel.create(project);
    // Se informa al cliente que se guardo el proyecto
    log.info(`Se carga proyecto ${savedProject}`);
    // Se registra en el log el redireccionamiento
    log.info('Se redirecciona el sistema a /project');
    /// Agregando mensaje de flash
    req.flash('successMessage', 'Proyecto agregado con exito');
    return res.redirect('/project');
  } catch (error) {
    log.error(
      'ln 53 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// GET "/project/edit/:id"
const edit = async (req, res) => {
  // Extrayendo el id por medio de los parametros de url
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del proyecto con el id: ${id}`);
    const project = await ProjectModel.findOne({ _id: id }).lean().exec();
    if (project === null) {
      log.info(`No se encontro el proyecto con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `No se encontro el proyecto con el id: ${id}` });
    }
    // Se manda a renderizar la vista de edición
    // res.render('project/editView', project);
    // Se manda a renderizar la vista de edición
    log.info(`Proyecto encontrado con el id: ${id}`);
    return res.render('project/editView', { project });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de project.controller');
    return res.status(500).json(error);
  }
};

// PUT "/project/edit/:id"
const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del proyecto con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/editView', { project, errorModel });
  }
  // Si no hay error
  const project = await ProjectModel.findOne({ _id: id });
  if (project === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newProject } = req;
  project.name = newProject.name;
  project.description = newProject.description;
  try {
    // Se salvan los cambios
    log.info(`Actualizando proyecto con id: ${id}`);
    await project.save();
    // Generando mensaje FLASH
    req.flash('successMessage', 'Proyecto editado con exito');
    return res.redirect(`/project/edit/${id}`);
  } catch (error) {
    log.error(`Error al actualizar proyecto con id: ${id}`);
    return res.status(500).json(error);
  }
};

// DELETE "/project/:id"
const deleteProject = async (req, res) => {
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await ProjectModel.findByIdAndRemove(id);
    // Agregando mensaje de flash
    req.flash('successMessage', 'Proyecto borrado con exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador user
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
  edit,
  editPut,
  deleteProject,
};
