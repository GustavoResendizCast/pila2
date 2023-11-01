import mongoose from 'mongoose';
import log from '../config/winston';

// Creando la funcion de conexion
export default async function connectionWithRetry(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl);
    log.info('✅ Conectado a Mongodb');
  } catch (error) {
    log.error(`❌ Fallo la conexion a Mongodb: ${error.message}`);
    log.error('Intentando a la conexion en 20 seg');
    setTimeout(() => connectionWithRetry(mongoUrl), 20000);
  }
}
