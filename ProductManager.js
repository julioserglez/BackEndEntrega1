const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.Path = path.join(__dirname, 'products.json');
        this.productos = JSON.parse(fs.readFileSync(this.Path, 'utf-8'));
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        return this.productos.find(p => p.id === id);
    }

    addProduct(producto) {
        const newId = this.productos.length ? this.productos[this.productos.length - 1].id + 1 : 1;
        const nuevoProducto = { id: newId, ...producto };
        this.productos.push(nuevoProducto);
        fs.writeFileSync(this.Path, JSON.stringify(this.productos, null, 2));
        return nuevoProducto;
    }

    updateProduct(id, updatedProduct) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index === -1) return null;
        this.productos[index] = { ...this.productos[index], ...updatedProduct };
        fs.writeFileSync(this.Path, JSON.stringify(this.productos, null, 2));
        return this.productos[index];
    }

    deleteProduct(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index === -1) return null;
        const deletedProduct = this.productos.splice(index, 1);
        fs.writeFileSync(this.Path, JSON.stringify(this.productos, null, 2));
        return deletedProduct[0];
    }

    
}

module.exports = ProductManager;