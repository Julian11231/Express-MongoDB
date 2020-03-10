const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventaSchema = Schema({
    fechaVenta: { type: String, required: [true, 'La fecha de la venta es necesaria'] },
    horaVenta: { type: String, required: [true, 'La hora de la venta es necesaria'] },
    cedulaComprador: { type: String, required: [true, 'La cédula del comprador es necesaria'] }
});

module.exports = mongoose.model('venta', ventaSchema);