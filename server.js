const express = require('express');
const productos = require('./api/productos');
//const instacncia = new productos();
// creo una app de tipo express
const app = express();
const productosRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// completar el codigo...
productosRouter.get('/productos/listar', (req, res) => {
    return res.send(productos.listar());
});

productosRouter.get('/productos/listar/:id', (req, res) => {
    return res.json(productos.listarPorId(req.params.id));
});

productosRouter.post('/productos/guardar', (req, res) => {
    return res.json(productos.guardar(req.body))
});
productosRouter.delete('/productos/borrar/:id', (req, res) => {
    return res.json(productos.borrar(req.params.id));
});

productosRouter.put('/productos/actualizar/:id', (req, res) => { 
    return res.json(productos.actualizar(req.params.id, req.body));
});
app.use('/api', productosRouter);
// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
