const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articuloSchema = Schema({
    nombreArticulo: { type: String, required: [true, 'El nombre del artículo es necesario'] },
    descripcionArticulo: { type: String, required: [true, 'La descripción del artículo es necesaria'] },
    precioArticulo: { type: String, required: [true, 'El precio del artículo es necesario'] },
    descuentoArticulo: { type: String, required: [true, 'El descuente del artículo es necesario'] },
    impuestoArticulo: { type: String, required: [true, 'El impuesto del artículo es necesario'] },
    cantidadArticulo: { type: Number, required: [true, 'La cantidad del artículo es es necesaria'] },
    catalogoArticulo: { type: String, required: [true, 'El id del catálogo es necesario'] }
});

module.exports = mongoose.model('articulo', articuloSchema);