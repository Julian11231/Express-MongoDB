const express = require('express');
const router = express.Router();
const Catalogo = require('../models/catalogoTienda');
const Tienda = require('../models/tienda');

router.get('/', async(req, res) => {
    const nitTienda = req.query.nitTienda;
    const catalogos = await Catalogo.find({ "nitTienda": nitTienda });
    const tienda = await Tienda.find({ "nit": nitTienda });
    res.render('catalogos', {
        catalogos,
        tienda
    });
});

router.get('/adminCatalogo', async(req, res) => {
    const catalogos = await Catalogo.find();
    const tiendas = await Tienda.find();
    res.render('adminCatalogo', {
        catalogos,
        tiendas
    });
});

router.post('/add', async(req, res, next) => {
    const catalogo = new Catalogo(req.body);
    await catalogo.save();
    res.redirect('/catalogos/adminCatalogo');
});

router.post('/edit/:id', async(req, res, next) => {
    const { id } = req.params;
    await Catalogo.update({ _id: id }, req.body);
    res.redirect('/catalogos/adminCatalogo');
});

router.get('/delete/:id', async(req, res, next) => {
    let { id } = req.params;
    await Catalogo.remove({ _id: id });
    res.redirect('/catalogos/adminCatalogo');
});

module.exports = router;