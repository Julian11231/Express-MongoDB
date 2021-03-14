const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    cedula: { type: String, unique: true, required: [true, 'La cédula es necesaria'] },
    nombre: { type: String, required: [true, 'EL nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    direccion: { type: String, required: [true, 'La dirección es necesaria'] },
    contraseña: { type: String, required: [true, 'La contraseña es necesaria'] },
    correo: { type: String, required: [true, 'El correo es necesario'] }
});

module.exports = mongoose.model('usuario', usuarioSchema);