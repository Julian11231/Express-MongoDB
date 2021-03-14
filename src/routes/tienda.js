const express = require('express');
const router = express.Router();
const Tienda = require('../models/tienda');

router.get('/', async(req, res) => {
    const tiendas = await Tienda.find();
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('tiendas', {
        tiendas,
        user
    });
});

router.get('/adminTienda', async(req, res) => {
    const tiendas = await Tienda.find();
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('adminTienda', {
        tiendas,
        user
    });
});

router.post('/add', async(req, res, next) => {
    const tienda = new Tienda(req.body);
    await tienda.save();
    res.redirect('/tiendas/adminTienda');
});

router.post('/edit/:id', async(req, res, next) => {
    const { id } = req.params;
    await Tienda.update({ _id: id }, req.body);
    res.redirect('/tiendas/adminTienda');
});

router.delete('/delete/:id', async(req, res, next) => {
    let { id } = req.params;
    await Tienda.remove({ _id: id });
    res.redirect('/tiendas/adminTienda');
});

module.exports = router;