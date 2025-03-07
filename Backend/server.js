require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI; // Get MongoDB URI from .env
const client = new MongoClient(uri);
const PORT = process.env.PORT || 5000; // Use the port from .env, default to 5000

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(process.env.DB_NAME); // Get database name from .env

        // Import and use bill routes
        const billRoutes = require('./routes/bill')(db);
        app.use('/bills', billRoutes);

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer();
