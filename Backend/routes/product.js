const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = (db) => {
    const router = express.Router();
    const productsCollection = db.collection('products');

    // Get all products
    router.get('/all', async (req, res) => {
        try {
            const products = await productsCollection.find({}).toArray();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error });
        }
    });

    // Add a new product
    router.post('/add', async (req, res) => {
        try {
            const { name, price } = req.body;
            if (!name || !price) {
                return res.status(400).json({ message: "Name and Price are required" });
            }
            const newProduct = { name, price: Number(price), createdAt: new Date() };
            const result = await productsCollection.insertOne(newProduct);
            res.status(201).json({ ...newProduct, _id: result.insertedId });
        } catch (error) {
            res.status(500).json({ message: "Error adding product", error });
        }
    });

    // Delete a product
    router.delete('/:id', async (req, res) => {
        try {
            const result = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            if (result.deletedCount === 1) {
                res.status(200).json({ message: "Product deleted" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error });
        }
    });

    return router;
};
