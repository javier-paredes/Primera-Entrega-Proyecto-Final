class Productos {
    constructor() {
        this.producto = [];
    }

    async listar() {
        try {
            let lecturaArchivo = fs.promises.readFile('./persistencia/productos', 'utf-8');
            let productos = JSON.parse(lecturaArchivo);
            return productos;
        } catch {
            console.log([])
            return []
        }
    }

    async guardar(productos) {
        try {
            let leerProductos = await this.listar()
            productos.id = leerProductos.length + 1
            this.producto.push(productos);
            fs.promises.writeFile('./persistencia/productos', JSON.stringify(this.producto, null, '\t'));
        } catch {
            throw new Error('No se pudo guardar un nuevo producto')
        }
    }

    actualizar(idProducto, nuevoProducto) {
        try {
            let leerProductos = await this.listar()
            leerProductos[idProducto] = nuevoProducto;
            this.producto = leerProductos;
            fs.promises.writeFile('./persistencia/productos', JSON.stringify(leerProductos, null, '\t'));
        } catch {
            throw new Error('No se pudo actualizar el producto')
        }
    }

    borrar(idProducto) {
        let productoBorrado = this.producto.splice(idProducto, 1);
        return productoBorrado;
    }
}

module.exports = new Productos();

class Archivo {

    constructor(pathArchivo) {
        this.pathArchivo = pathArchivo;
    }

    async leer() {
        try {
            let lecturaArchivo = await fs.promises.readFile(this.pathArchivo, 'utf-8');
            let productos = JSON.parse(lecturaArchivo)
            console.log(productos)
            return productos
        } catch {
            console.log([])
            return []
        }

    }

    async guardar(producto) {
        let leidos = await this.leer()
        producto.id = leidos.length + 1
        leidos.push(producto)

        try {
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(leidos, null, '\t'));
        } catch {
            throw new Error('No se pudo guardar un nuevo producto')
        }

    }
    async borrar() {
        try {
            await fs.promises.unlink(this.pathArchivo);
        } catch {
            throw new Error('No se pudo eliminar el archivo')
        }
    }
}