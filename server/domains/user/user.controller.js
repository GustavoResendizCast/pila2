import log from '../../config/winston';
import User from './user.model';
// Action Methods

// GET "/login"
const login = (req, res) => {
  // Sirve el formulario de login
  log.info('Se entrega formulario de login');
  res.render('user/login');
};

// GET '/user/logout'
const logout = (req, res) => {
  // Passport incrusta en la petición el
  // método logout aqui se ejecuta
  // REF: https://www.passportjs.org/concepts/authentication/logout/
  req.logout((err) => {
    if (err) {
      return res.json(err);
    }
    // Creamos mensaje de flash
    req.flash('successMessage', 'Ha cerrado sesión correctamente');
    // Redireccionamos al login
    return res.redirect('/user/login');
  });
};

// GET "/register"
const register = (req, res) => {
  log.info('Se entrega formulario de registro');
  res.render('user/register');
};

// POST '/user/register'
const registerPost = async (req, res) => {
  const { validData: userFormData, errorData } = req;
  log.info('Se procesa formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return res.json(errorData);
  }
  // En caso de no haber errores, se crea el usuario
  try {
    // 1. Se crea una instancia del modelo User
    // mendiante la funcion create del modelo
    const user = await User.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    // Se construye el viewModel del usuario
    const viewModel = {
      ...user.toJSON(),
      // Color de fondo
      backgroundColor: 'cyan darken-2',
    };
    log.info('Se manda a renderizar la vista "successfulRegistration.hbs"');
    return res.render('user/successfulRegistration', viewModel);
  } catch (error) {
    log.error(error.message);
    return res.json({
      message: error.message,
      name: error.name,
      errors: error.errors,
    });
  }
};

// GET user/confirm/<token>
const confirm = async (req, res) => {
  // Extrayendo datos de validación
  const { validData, errorData } = req;
  if (errorData) return res.json(errorData);
  const { token } = validData;
  // Buscando si existe un usuario con ese token
  const user = await User.findByToken(token);
  if (!user) {
    return res.send('USER WITH TOKEN NOT FOUND');
  }
  // Activate user
  await user.activate();
  return res.send(`Usuario: ${user.firstName} Validado`);
};

export default {
  login,
  logout,
  register,
  registerPost,
  confirm,
};
