const express = require('express');
const router = express.Router();
const Catalogo = require('../models/catalogoTienda');
const Tienda = require('../models/tienda');

router.get('/', async(req, res) => {
    const idTienda = req.query.idTienda;
    const catalogos = await Catalogo.find({ "idTienda": idTienda, "estado": true }).populate('idTienda');
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('catalogos', {
        catalogos,
        user
    });
});

router.get('/adminCatalogo', async(req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        const idTienda = req.query.idTienda;
        if(user.rol === "USER_OWNER" && user.tienda._id == idTienda){
            const catalogos = await Catalogo.find({ "idTienda": idTienda });
            res.render('adminCatalogo', {
                catalogos,
                user
            });
        }else{
            res.redirect('/');
        }
    }

});

router.post('/add', async(req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        if(user.rol === "USER_OWNER"){
            const catalogo = new Catalogo(req.body);
            await catalogo.save();
            res.redirect('/catalogos/adminCatalogo?nitTienda='+user.tienda.nit);
        }else{
            res.redirect('/');
        }
    }
});

router.post('/edit/:id', async(req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        if(user.rol === "USER_OWNER"){
            const { id } = req.params;
            await Catalogo.update({ _id: id }, req.body);
            res.redirect('/catalogos/adminCatalogo?nitTienda='+user.tienda.nit);
        }else{
            res.redirect('/');
        }
    }    
});

router.get('/disable/:id', async(req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        if(user.rol === "USER_OWNER"){
            let { id } = req.params;
            await Catalogo.update({ _id: id }, {'estado': false});
            res.redirect('/catalogos/adminCatalogo?nitTienda='+user.tienda.nit);
        }else{
            res.redirect('/');
        }
    }
});

router.get('/enable/:id', async(req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        if(user.rol === "USER_OWNER"){
            let { id } = req.params;
            await Catalogo.update({ _id: id }, {'estado': true});
            res.redirect('/catalogos/adminCatalogo?nitTienda='+user.tienda.nit);
        }else{
            res.redirect('/');
        }
    }
});

module.exports = router;