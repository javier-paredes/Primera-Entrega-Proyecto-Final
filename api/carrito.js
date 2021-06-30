const fs = require('fs');
const productos = require('.//productos');
class Carrito {
    constructor(producto) {
        this.carrito = [];
    }

    listar() {
        let leerCarrito = fs.readFileSync('./persistencia/carrito.txt')
        let carrito = JSON.parse(leerCarrito)
        return carrito;
    }

    listarPorID(idCarrito) {
        let lecturaArchivo = fs.promises.readFileSync('./persistencia/carrito.txt', 'utf-8');
        let carrito = JSON.parse(lecturaArchivo);
        return carrito[idCarrito];
    }

    agregar(idProducto) {        
        this.carrito = this.listar()        
        let listaProductos = productos.listar();
        let productoElegido = listaProductos[idProducto];
        console.log(productoElegido);
        let id = this.carrito.length;
        let timestamp = new Date().toLocaleString();
        this.carrito.push({
            "id": id,
            "timestamp": timestamp,
            "producto": productoElegido
        });                
        fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(this.carrito, null, '\t'));
    }

    borrar(idProducto) {
        this.carrito = this.listar();
        let productoBorrado = this.carrito.splice(idProducto, 1);
        fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(this.carrito, null, '\t'));        
    }
}

module.exports = new Carrito();