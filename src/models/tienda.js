const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TiendaSchema = Schema({
    nit: { type: String, required: [true, 'El nit de la tienda es necesario'] },
    nombreTienda: { type: String, required: [true, 'El nombre de la tienda es necesario'] },
    direccionTienda: { type: String, required: [true, 'La dirección de la tienda es necesaria'] },
    logoTienda: {type: String, required: false},
    estado: {type:Boolean, required:[true, 'El estado es necesario'], default: true}
});

module.exports = mongoose.model('tienda', TiendaSchema);