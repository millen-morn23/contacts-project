require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Configuration
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

// Start the server after connecting to MongoDB
async function startServer() {
    try {
        console.log("🔄 Connecting to MongoDB Atlas...");

        await client.connect();

        console.log("✅ Connected to MongoDB Atlas");

        app.locals.db = client.db(process.env.DB_NAME);

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    }
}

startServer();