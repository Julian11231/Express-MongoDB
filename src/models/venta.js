const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventaSchema = Schema({
    fechaVenta: { type: String, required: [true, 'La fecha de la venta es necesaria'] },
    horaVenta: { type: String, required: [true, 'La hora de la venta es necesaria'] },
    cedulaComprador: { type: String, required: [true, 'La cédula del comprador es necesaria'] },
    nitTienda: { type: String, ref: 'tienda', required: [true, 'El nit de la tienda es necesario'] },
    estado: {type:Boolean, required:[true, 'El estado es necesario'], default: true}
});

module.exports = mongoose.model('venta', ventaSchema);