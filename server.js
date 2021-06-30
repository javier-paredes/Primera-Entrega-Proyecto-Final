require('dotenv').config()
const express = require('express');
const fs = require('fs')
const { producto, listar } = require('./api/productos');
const productos = require('./api/productos');

const routerCarrito = express.Router()
const routerProductos = express.Router()

let admin = true;

routerProductos.get('/listar/:id', (req, res) => {
    let idProducto = req.params.id
    productos.listarPorID(idProducto)
    res.json()
})

routerProductos.post('/agregar', (req, res) => {

})

routerProductos.put('/actualizar/:id', (req, res) => {

})

routerProductos.delete('/borrar/:id', (req, res) => {

})

routerCarrito.get('/listar/:id', (req, res) => {

})

routerCarrito.post('/agregar/:id_producto', (req, res) => {

})

routerCarrito.delete('/borrar/id', (req, res) => {

})

// CREACION ROUTERS CARRITO Y PRODUCTOS
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);



const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${process.env.PUERTO}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

