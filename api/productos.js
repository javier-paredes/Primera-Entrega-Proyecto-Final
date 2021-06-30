class Productos {
    constructor() {
        this.producto = [];
    }

    async listar(idProducto) {
        try {
            let lecturaArchivo = fs.promises.readFile('./persistencia/productos', 'utf-8');
            let productos = JSON.parse(lecturaArchivo);
            return productos;
        } catch {
            console.log([])
            return []
        }
    }

    listarPorID(idProducto) {
        let lecturaArchivo = fs.promises.readFile('./persistencia/productos', 'utf-8');
        let productos = JSON.parse(lecturaArchivo);
        return productos[idProducto];
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
        this.producto.splice(idProducto, 1);        
    }
}

module.exports = new Productos();

