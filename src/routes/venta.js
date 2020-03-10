const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');

router.get('/adminVenta', async(req, res) => {
    const ventas = await Venta.find();
    res.render('adminVenta', {
        ventas
    });
});

router.get('/comprasUsuario', async(req, res) => {
    const cedulaUsuario = req.query.cedula;
    const comprasUsuario = await Venta.find({ "cedulaComprador": cedulaUsuario });
    res.render('comprasUsuario', {
        comprasUsuario
    });
});

router.post('/edit/:id', async(req, res, next) => {
    const { id } = req.params;
    await Venta.update({ _id: id }, req.body);
    res.redirect('/ventas/adminVenta');
});

router.get('/delete/:id', async(req, res, next) => {
    let { id } = req.params;
    await Venta.remove({ _id: id });
    res.redirect('/ventas/adminVenta');
});

module.exports = router;