class Carrito {
    constructor() {
        this.carrito = [];
    }

    listar(idProducto) {
        return this.carrito[idProducto];
    }

    guardar(nuevoProducto) {

        this.carrito.push(nuevoProducto);
    }

    actualizar(idProducto, productoActualizado) {
        this.carrito[idProducto] = productoActualizado;
    }

    borrar(idProducto) {
        let productoBorrado = this.carrito.splice(idProducto, 1);
        return productoBorrado;
    }
}

module.exports = new Carrito();