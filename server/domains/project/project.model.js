// Importando moongose
import mongoose from 'mongoose';
// Desestructurando la funcion Schema Special
const { Schema } = mongoose;

// Construyendo un schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

// Compilando el Schema para generar un modelo
export default mongoose.model('prject', ProjectSchema);
