const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session')
const Articulo = require('./models/articulo');
const LineaVenta = require('./models/lineaVenta');
const Venta = require('./models/venta');
const app = express();

// connection to db
mongoose.connect('mongodb://localhost:27017/produndizacionIII', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    console.log('Version del mongoose:', mongoose.version)
});

// importing routes
const indexRoutes = require('./routes/index');
const tienda = require('./routes/tienda');
const catalogoTienda = require('./routes/catalogoTienda');
const articulo = require('./routes/articulo');
const venta = require('./routes/venta');
const lineaVenta = require('./routes/lineaVenta');
const usuario = require('./routes/usuario');
//const session = require('./routes/session');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', indexRoutes);
app.use('/tiendas', tienda);
app.use('/catalogos', catalogoTienda);
app.use('/articulos', articulo);
app.use('/ventas', venta);
app.use('/lineaVentas', lineaVenta);
app.use('/usuarios', usuario);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function(req, res, next) {
    if (!req.session.articulos) {
        req.session.articulos = [];
    }
    next()
})

app.post('/agregarCarro/', async(req, res, next) => {
    const id = req.query.id;
    const cantidad = req.body.cantidad;
    var articuloYaAgregado = false;
    if (req.session.articulos.length == 0) {
        const product = await Articulo.find({ "_id": id });
        const nombreArticulo = product[0].nombreArticulo;
        const descripcionArticulo = product[0].descripcionArticulo;
        const precio = parseFloat(product[0].precioArticulo) + parseFloat(product[0].precioArticulo) * parseFloat(product[0].impuestoArticulo) / 100 - parseFloat(product[0].precioArticulo) * parseFloat(product[0].descuentoArticulo) / 100;
        const precioFinal = precio.toFixed(2);
        var articulo = { id: id, nombre: nombreArticulo, descripcion: descripcionArticulo, precio: precioFinal, cantidad: cantidad };
        req.session.articulos.push(articulo);
    } else {
        for (i = 0; i < req.session.articulos.length; i++) {
            if (req.session.articulos[i].id == id) {
                req.session.articulos[i].cantidad = parseInt(req.session.articulos[i].cantidad) + parseInt(cantidad);
                articuloYaAgregado = true;
            }
        }
        if (articuloYaAgregado == false) {
            const product = await Articulo.find({ "_id": id });
            const nombreArticulo = product[0].nombreArticulo;
            const descripcionArticulo = product[0].descripcionArticulo;
            const precio = parseFloat(product[0].precioArticulo) + parseFloat(product[0].precioArticulo) * parseFloat(product[0].impuestoArticulo) / 100 - parseFloat(product[0].precioArticulo) * parseFloat(product[0].descuentoArticulo) / 100;
            const precioFinal = precio.toFixed(2);
            var articulo = { id: id, nombre: nombreArticulo, descripcion: descripcionArticulo, precio: precioFinal, cantidad: cantidad };
            req.session.articulos.push(articulo);
        }
    }
    res.redirect('/tiendas');
});

app.get('/vaciarCarro', (req, res, next) => {
    req.session.destroy();
    res.redirect('/carro');
});

app.get('/comprar/', async(req, res, next) => {
    const cedula = req.query.cedula;
    const d = new Date();
    const date = d.toDateString();
    const hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    ventaNueva = new Venta({ fechaVenta: date, horaVenta: hora, cedulaComprador: cedula });
    ventaNueva.save();
    const ventaActual = await Venta.find({ "fechaVenta": date, "horaVenta": hora }, '_id');
    for (i = 0; i < req.session.articulos.length; i++) {
        lineaVentaNueva = new LineaVenta({ idArticuloVenta: req.session.articulos[i].id, cantidadVenta: req.session.articulos[i].cantidad, idventa: ventaActual[0]._id });
        lineaVentaNueva.save();
        var restarInventario = Number(req.session.articulos[i].cantidad) * (-1);
        await Articulo.updateOne({ "_id": req.session.articulos[i].id }, { $inc: { "cantidadArticulo": restarInventario } });
    }
    req.session.destroy();
    res.redirect('/lineaVentas/factura?venta=' + ventaActual[0]._id);
});

app.get('/borrarArticuloCarro', (req, res, next) => {
    const index = req.query.index;
    req.session.articulos.splice(index, 1);
    res.redirect('/carro');
});

app.get('/carro', (req, res, next) => {
    listaArticulos = req.session.articulos;
    res.render('carro', {
        listaArticulos
    });
});