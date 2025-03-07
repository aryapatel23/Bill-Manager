const express = require('express');
const { ObjectId } = require('mongodb');
const { validateBill } = require('../models/billSchema'); // Import Schema Validation

const router = express.Router();

module.exports = function (db) {
    const billCollection = db.collection('bills');

    // POST request: Create a new bill
    router.post('/create', async (req, res) => {
        try {
            const billData = req.body;

            // Validate Bill Data (with error handling)
            try {
                const validation = validateBill(billData);
                if (!validation.valid) {
                    return res.status(400).json({ error: validation.error });
                }
            } catch (validationError) {
                return res.status(400).json({ error: "Invalid bill data format" });
            }

            // Add timestamps
            billData.date = new Date(billData.date);
            billData.createdAt = new Date();

            // Insert into MongoDB
            const result = await billCollection.insertOne(billData);

            res.status(201).json({ message: "Bill created successfully", billId: result.insertedId });
        } catch (error) {
            console.error("Error creating bill:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // GET request: Fetch all bills
    router.get('/all', async (req, res) => {
        try {
            const bills = await billCollection.find().toArray();
            res.status(200).json(bills);
        } catch (error) {
            console.error("Error fetching bills:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Get a single bill by ID
    router.get('/:id', async (req, res) => {
        try {
            const billId = req.params.id;
            const bill = await billCollection.findOne({ _id: new ObjectId(billId) });

            if (!bill) return res.status(404).json({ error: "Bill not found" });

            res.json(bill);
        } catch (error) {
            console.error("Error fetching bill:", error);
            res.status(500).json({ error: "Failed to fetch the bill" });
        }
    });

    return router;
};
