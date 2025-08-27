const express = require ('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager');
const productos = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

// Obtener todos los productos
app.get('/api/products', (req, res) => {
  res.json(productos.getProducts());
});

// Obtener un producto por id
app.get('/api/products/:id', (req, res) => {
  const prod = productos.getProductById(Number(req.params.id));
  if (prod) return res.json(prod);
  res.status(404).json({ error: 'Producto no encontrado' });
});

// Agregar un producto
app.post('/api/products/add', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbail } = req.body;
    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const nuevo = productos.addProduct({ title, description, code, price, status, stock, category, thumbail });
    res.status(201).json(nuevo);
});

// Actualizar un producto
app.put('/api/products/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = productos.updateProduct(Number(id), req.body);
    if (updatedProduct) return res.json(updatedProduct);
    res.status(404).json({ error: 'Producto no encontrado' });
});

// Eliminar un producto
app.delete('/api/productos/delete/:id', (req, res) => {
    const deleted = productos.deleteProduct(Number(req.params.id));
    if (deleted) return res.status(204).send();
    res.status(404).json({ error: 'Producto no encontrado' });
});


///asigna el purto a la app 
app.listen(port, () => {
  console.log(`Servidor escuchando la url http://localhost:${port}`);
});

