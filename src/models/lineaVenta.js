const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineaVentaSchema = Schema({
    idArticuloVenta: { type: Schema.Types.ObjectId, ref: 'articulo', required: [true, 'EL id del artículo es necesario'] },
    cantidadVenta: { type: String, required: [true, 'La cantidad del artículo vendido es necesaria'] },
    idventa: { type: Schema.Types.ObjectId, ref: 'venta', required: [true, 'El id de la venta es necesario'] }
});

module.exports = mongoose.model('lineaVenta', lineaVentaSchema);