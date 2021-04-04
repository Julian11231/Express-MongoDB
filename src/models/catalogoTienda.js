const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogoTiendaSchema = Schema({
    nombreCatalogo: { type: String, required: [true, 'El nombre del catálogo es necesario'] },
    idTienda: { type:Schema.Types.ObjectId, ref: 'tienda', required: [true, 'El id de la tienda es necesario'] },
    descripcionCatalogo: { type: String, required: [true, 'La descripción del catálogo es necesario'] },
    estado: {type:Boolean, required:[true, 'El estado es necesario'], default: true}
});

module.exports = mongoose.model('catalogoTienda', catalogoTiendaSchema);