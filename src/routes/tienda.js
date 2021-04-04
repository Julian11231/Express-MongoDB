const express = require('express');
const router = express.Router();
const Tienda = require('../models/tienda');

router.get('/', async(req, res) => {
    const tiendas = await Tienda.find({estado: true});
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
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(typeof user === "undefined" || user === null){
        res.redirect('/');
    }else{
        if(user.rol === "USER_OWNER"){
            const nitTienda = req.query.nitTienda;
            const tiendas = await Tienda.find({ "nit": nitTienda });
            const tienda = tiendas[0];
            res.render('adminTienda', {
                tienda,
                user
            });
        }else{
            res.redirect('/')
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
            const tienda = new Tienda(req.body);
            await tienda.save();
            res.redirect('/tiendas/adminTienda/?nitTienda='+req.body.nitTienda);
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
            await Tienda.update({ _id: id }, req.body);
            res.redirect('/tiendas/adminTienda/?nitTienda='+req.body.nit);
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
            await Tienda.update({ _id: id }, {'estado': false});
            res.redirect('/tiendas/adminTienda/?nitTienda='+user.tienda.nit);
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
            await Tienda.update({ _id: id }, {'estado': true});
            res.redirect('/tiendas/adminTienda/?nitTienda='+user.tienda.nit);
        }else{
            res.redirect('/');
        }
    }
});

module.exports = router;