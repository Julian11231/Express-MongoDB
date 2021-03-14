const express = require('express');
const router = express.Router();
const Articulo = require('../models/articulo');
const Catalogo = require('../models/catalogoTienda');

router.get('/', async(req, res) => {
    const catalogoArticulo = req.query.catalogoArticulo;
    const articulos = await Articulo.find({ "catalogoArticulo": catalogoArticulo });
    const catalogo = await Catalogo.find({ "_id": catalogoArticulo });
    const tienda = req.query.tienda;
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('articulos', {
        articulos,
        catalogo,
        tienda,
        user
    });
});

router.get('/adminArticulo', async(req, res) => {
    const articulos = await Articulo.find();
    const catalogos = await Catalogo.find();
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('adminArticulo', {
        articulos,
        catalogos,
        user
    });
});

router.post('/add', async(req, res, next) => {
    const articulo = new Articulo(req.body);
    await articulo.save();
    res.redirect('/articulos/adminArticulo');
});

router.post('/edit/:id', async(req, res, next) => {
    const { id } = req.params;
    await Articulo.update({ _id: id }, req.body);
    res.redirect('/articulos/adminArticulo');
});

router.get('/delete/:id', async(req, res, next) => {
    let { id } = req.params;
    await Articulo.remove({ _id: id });
    res.redirect('/articulos/adminArticulo');
});

module.exports = router;