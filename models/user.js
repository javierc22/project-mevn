import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} rol no válido'
}

const userSchema = new Schema({
  nombre: {type:String, required: [true, 'El nombre es obligatorio']},
  email: {type: String, required: [true, 'El email es obligatorio' ]},
  pass: {type: String, required: [true, 'Pass es obligatoria']},
  date: {type: Date, default: Date.now},
  role: {type: String, default: 'USER', enum: roles},
  activo: {type: Boolean, default: true}
});

// Convertir a un modelo
const User = mongoose.model('User', userSchema);

export default User;