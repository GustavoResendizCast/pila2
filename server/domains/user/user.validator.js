import * as Yup from 'yup';

// Crear un esquema de validación
// Creando el esquema de validación
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Se requiere ingresar nombre'),
  lastname: Yup.string().required('Se requiere ingresar apellido'),
  mail: Yup.string().email().required('Se requiere ingresar un correo valido'),
  password: Yup.string()
    .min(6)
    .required('Se requiere ingresar password de al menos 6 caracteres'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'El password de confirmación no coincide',
  ),
});

const signUpGetter = (req) => {
  // Desestructuramos la informacion
  const { firstName, lastname, mail, password, cpassword } = req.body; // Se regresa el objeto signup
  return {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
  };
};

// Crear un esquema de validación para token de confirmación
const tokenSchema = Yup.object().shape({
  token: Yup.string().length(64).required(),
});

// Middleware de extracción para token de confirmación
const getToken = (req) => {
  // Desestructuramos la informacion
  const { token } = req.params;
  // Se regresa el objeto signup
  return {
    token,
  };
};

const token = {
  schema: tokenSchema,
  getObject: getToken,
};

const signUp = {
  schema: signUpSchema,
  getObject: signUpGetter,
};

export default { signUp, token };
