// Importando biblioteca de validacion
import * as Yup from 'yup';

import log from '../../config/winston';

// Creando un esquema de validación para el proyecto
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre de proyecto'),
  description: Yup.string()
    .max(500, 'No escribir mas de 500 caracteres')
    .required('Se requiere una descripción del proyecto'),
});

// Creando el extractor de datos de la petición
const getProject = (req) => {
  // Extrayendo datos de la petición
  const { name, description } = req.body;
  log.info(
    `Se extraen datos de la petición: name ${name}, description: ${description}`,
  );
  // Regresando el objeto proyecto
  return {
    name,
    description,
  };
};

export default {
  projectSchema,
  getProject,
};
