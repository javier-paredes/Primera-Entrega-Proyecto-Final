require('dotenv').config()
const express = require('express');
const fs = require('fs');
const productos = require('./api/productos');
const carrito = require('./api/carrito');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerCarrito = express.Router();
const routerProductos = express.Router();

let admin = true;

routerProductos.get('/listar/:id', (req, res) => {
    let idProducto = req.params.id;
    let productoPedido = productos.listarPorID(idProducto);
    res.json(productoPedido);
})

routerProductos.post('/agregar', (req, res) => {
    let nuevoProducto = req.body;
    productos.guardar(nuevoProducto);
    res.send('Producto Agregado');
})

routerProductos.put('/actualizar/:id', (req, res) => {
    let idProducto = req.params.id;
    let productoActualizado = req.body;
    productos.actualizar(idProducto, productoActualizado);
    res.send('Producto Actualizado');
})

routerProductos.delete('/borrar/:id', (req, res) => {
    let idProducto = req.params.id;
    productos.borrar(idProducto);
    res.send('Producto Borrado');
})


routerCarrito.get('/listar/:id', (req, res) => {
    let idCarrito = req.params.id;
    carritoPedido = carrito.listarPorID(idCarrito);
    res.json(carrito);
})

let idIndividualCarrito = 0;
routerCarrito.post('/agregar/:id_producto', (req, res) => {
    idIndividualCarrito += 1;
    carrito.carrito.id += idIndividualCarrito;
    carrito.carrito.timestamp = new Date().toLocaleString();
    let idProducto = req.params.id_producto;
    carrito.agregar(idProducto);
    res.send('Product agregado al carrito')
})

routerCarrito.delete('/borrar/:id', (req, res) => {
    carrito.borrar(req.params.id)
    res.send('Producto borrado')
})

// CREACION ROUTERS CARRITO Y PRODUCTOS
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);


// FUNCION PARA CHECKEAR LOS PRIVILEGIOS (USUARIO - ADMIN)
function auth(req, res, next) {
    if (usuario.logged == true) {
        console.log("optional");
        next();
        return
    }
    res.json("Sin permisos, usuario no identificado")
}


const server = app.listen(process.env.PUERTO, () => {
    console.log(`servidor escuchando en http://localhost:${process.env.PUERTO}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

