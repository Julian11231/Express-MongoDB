const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/adminUsuario', async(req, res) => {
    const usuarios = await Usuario.find();
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    const user = JSON.parse(localStorage.getItem('usuario'));
    res.render('adminUsuario', {
        usuarios,
        user
    });
});

router.post('/add', async(req, res, next) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.redirect('/usuarios/adminUsuario');
});

router.post('/edit/:id', async(req, res, next) => {
    const { id } = req.params;
    await Usuario.update({ _id: id }, req.body);
    res.redirect('/usuarios/adminUsuario');
});

router.get('/delete/:id', async(req, res, next) => {
    let { id } = req.params;
    await Usuario.remove({ _id: id });
    res.redirect('/usuarios/adminUsuario');
});

module.exports = router;