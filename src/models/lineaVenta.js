const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineaVentaSchema = Schema({
    nombreArticulo: { type: String, required: [true, 'El nombre del artículo es necesario'] },
    descripcionArticulo: { type: String, required: [true, 'La descripción del artículo es necesaria'] },
    precioArticulo: { type: String, required: [true, 'El precio del artículo es necesario'] },
    descuentoArticulo: { type: String, required: [true, 'El descuente del artículo es necesario'] },
    impuestoArticulo: { type: String, required: [true, 'El impuesto del artículo es necesario'] },
    cantidadVenta: { type: String, required: [true, 'La cantidad del artículo vendido es necesaria'] },
    nitTienda: { type: String, ref: 'tienda', required: [true, 'El nit de la tienda es necesario'] },
    idventa: { type: Schema.Types.ObjectId, ref: 'venta', required: [true, 'El id de la venta es necesario'] },
    estado: {type:Boolean, required:[true, 'El estado es necesario'], default: true}
});

module.exports = mongoose.model('lineaVenta', lineaVentaSchema);