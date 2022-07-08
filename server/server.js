const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creating the Express app and assigning the port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Establishing connection with the database, URI specified from the .env
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

const flightsRouter = require('./routes/flights');

app.use('/flights', flightsRouter);

// Starting server. Listening to the connection on specified port
app.listen(port, () => { 
    console.log(`Server running on port: ${port}`);
});