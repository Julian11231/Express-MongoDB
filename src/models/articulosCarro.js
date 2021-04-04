const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aritculosCarroSchema = Schema({
    cedulaComprador: { type: String, required: [true, 'La cédula del comprador es necesaria'] },
    idArticulo: {type:Schema.Types.ObjectId, ref: 'articulo', required: [true, 'El id del articulo es necesario']}
});

module.exports = mongoose.model('venta', aritculosCarroSchema);