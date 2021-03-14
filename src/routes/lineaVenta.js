const express = require('express');
const router = express.Router();
const LineaVenta = require('../models/lineaVenta');

router.get('/factura', async(req, res) => {
    const venta = req.query.venta;
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    const lineaVenta = await LineaVenta.find({ "idventa": venta })
        .populate({ path: 'idArticuloVenta', select: ('articulo', 'nombreArticulo descripcionArticulo precioArticulo descuentoArticulo impuestoArticulo') })
        .populate({ path: 'idventa', select: ('venta', 'fechaVenta horaVenta cedulaComprador') });
    res.render('factura', {
        lineaVenta,
        user,
    });
});

router.get('/articulosVendidos', async(req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    const lineaVentas = await LineaVenta.find()
        .populate({ path: 'idArticuloVenta', select: ('articulo', 'nombreArticulo') })
        .populate({ path: 'idventa', select: ('venta', '_id fechaVenta horaVenta cedulaComprador') });
    res.render('articulosVendidos', {
        lineaVentas,
        user
    });
});

module.exports = router;