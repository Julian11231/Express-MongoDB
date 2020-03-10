const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/adminUsuario', async(req, res) => {
    const usuarios = await Usuario.find();
    res.render('adminUsuario', {
        usuarios
    });
});

router.get('/oneUser/', async(req, res) => {
    const cedula = req.query.cedula;
    const usuario = await Usuario.find({ "cedula": cedula }, 'cedula');
    if (usuario.length >= 1) {
        res.send('existe');
    } else {
        res.send('No existe');
    }
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