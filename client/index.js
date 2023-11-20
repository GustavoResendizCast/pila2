// cargando los estilos
import './styles/style.css';
// Importando estilos de Materialize CSS
import 'materialize-css/dist/css/materialize.css';
// Importando scripts de Materialize
import 'materialize-css/dist/js/materialize';
// Script para borrar proyecto
import deleteProject from './domains/project.dashboard';

// Inicializando Scripts de Materialize para interactividad
M.AutoInit();

// Cargando script en caso de que la URL sea '/project'
if (window.location.pathname === '/project/showDashboard') {
  window.deleteProject = deleteProject;
}

// Mensaje en la consola
console.log('🎉 Estilos cargados correctamente 🎉');
