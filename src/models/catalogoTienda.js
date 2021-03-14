const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogoTiendaSchema = Schema({
    nombreCatalogo: { type: String, required: [true, 'El nombre del catálogo es necesario'] },
    nitTienda: { type: String, required: [true, 'El nit de la tienda es necesario'] },
    descripcionCatalogo: { type: String, required: [true, 'La descripción del catálogo es necesario'] }
});

module.exports = mongoose.model('catalogoTienda', catalogoTiendaSchema);