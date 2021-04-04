const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articuloSchema = Schema({
    nombreArticulo: { type: String, required: [true, 'El nombre del artículo es necesario'] },
    descripcionArticulo: { type: String, required: [true, 'La descripción del artículo es necesaria'] },
    precioArticulo: { type: String, required: [true, 'El precio del artículo es necesario'] },
    descuentoArticulo: { type: String, required: [true, 'El descuente del artículo es necesario'] },
    impuestoArticulo: { type: String, required: [true, 'El impuesto del artículo es necesario'] },
    cantidadArticulo: { type: Number, required: [true, 'La cantidad del artículo es es necesaria'] },
    catalogoArticulo: { type:Schema.Types.ObjectId, ref:'catalogoTienda', required: [true, 'El id del catálogo es necesario'] },
    idTienda: { type: Schema.Types.ObjectId, ref: 'tienda', required: [true, 'El id de la tienda es necesario'] },
    estado: {type:Boolean, required:[true, 'El estado es necesario'], default: true}
});

module.exports = mongoose.model('articulo', articuloSchema);


