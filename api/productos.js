const fs = require('fs');
class Productos {
    constructor() {
        this.producto = [];
    }

    listar() {
        try {
            let lecturaArchivo = fs.readFileSync('./persistencia/productos.txt', 'utf-8');
            let productos = JSON.parse(lecturaArchivo);
            return productos;
        } catch (error) {
            console.log(error)
            console.log([])
            return []
        }
    }

    listarPorID(idProducto) {
        try {
            let productosLeidos = this.listar();
            let productoElegido = productosLeidos.find(elemento => elemento.id == idProducto);
            return productoElegido;
        } catch (error) {
            console.log(error)
            throw new Error('No se pudieron listar los productos')
        }
    }

    guardar(productos) {
        try {
            let leerProductos = this.listar();
            this.producto = leerProductos;
            productos.id = Number(leerProductos.length) + 1;
            productos.timestamp = new Date().toLocaleString();
            this.producto.push(productos);
            fs.writeFileSync('./persistencia/productos.txt', JSON.stringify(this.producto, null, '\t'));
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo guardar un nuevo producto');
        }
    }

    actualizar(idProducto, nuevoProducto) {
        try {
            console.log(idProducto)
            console.log(nuevoProducto)
            this.producto = this.listar();
            let leerProductos = this.listarPorID(idProducto);
            leerProductos.nombre = nuevoProducto.nombre;
            leerProductos.descripcion = nuevoProducto.descripcion;
            leerProductos.codigo = nuevoProducto.codigo;
            leerProductos.precio = nuevoProducto.precio;
            leerProductos.stock = nuevoProducto.stock;
            leerProductos.id = Number(idProducto) + 1
            this.producto[idProducto] = leerProductos;
            fs.writeFileSync('./persistencia/productos.txt', JSON.stringify(this.producto, null, '\t'));
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo actualizar el producto');
        }
    }

    borrar(idProducto) {
        try {
            let leerProductos = this.listar();
            this.producto = leerProductos
            leerProductos.splice(idProducto, 1);
            this.producto = leerProductos;
            fs.writeFileSync('./persistencia/productos.txt', JSON.stringify(leerProductos, null, '\t'));
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo borrar el producto')
        }
    }
}

module.exports = new Productos();

