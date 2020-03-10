const express = require('express');
const router = express.Router();
const LineaVenta = require('../models/lineaVenta');

router.get('/factura', async(req, res) => {
    const venta = req.query.venta;
    const lineaVenta = await LineaVenta.find({ "idventa": venta })
        .populate({ path: 'idArticuloVenta', select: ('articulo', 'nombreArticulo descripcionArticulo precioArticulo descuentoArticulo impuestoArticulo') })
        .populate({ path: 'idventa', select: ('venta', 'fechaVenta horaVenta cedulaComprador') });
    res.render('factura', {
        lineaVenta
    });
});

router.get('/articulosVendidos', async(req, res) => {
    const lineaVentas = await LineaVenta.find()
        .populate({ path: 'idArticuloVenta', select: ('articulo', 'nombreArticulo') })
        .populate({ path: 'idventa', select: ('venta', '_id fechaVenta horaVenta cedulaComprador') });;
    res.render('articulosVendidos', {
        lineaVentas
    });
});

module.exports = router;