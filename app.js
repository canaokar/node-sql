// Import the necessary modules
const express = require('express'); // Express is a web application framework for Node.js
const mysql = require('mysql2'); // MySQL2 is a fast and lightweight SQL client for Node.js

// Create an instance of an Express application
const app = express();
const PORT = 3000; // Define the port number where the server will listen for requests

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',  // Hostname of the database server
  user: 'root',       // Username for the database
  password: 'myPa$$word', // Password for the database user
  database: 'car',    // Name of the database to use
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return; // Exit if there's an error
  }
  console.log('Connected to the database'); // Log success message
});

// Middleware to parse JSON bodies (built-in with Express)
app.use(express.json()); // This allows the app to parse JSON data in request bodies

// Middleware to parse URL-encoded bodies (if needed)
app.use(express.urlencoded({ extended: true })); // This allows the app to parse URL-encoded data in request bodies

// Route to initialize the database and create the table
app.get('/init-db', (req, res) => {
  // SQL query to create a table if it doesn't exist already
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cars (
      id INT AUTO_INCREMENT PRIMARY KEY, // Unique identifier for each car, auto-incremented
      car_name VARCHAR(255) NOT NULL,    // Car name, can't be null
      color VARCHAR(255) NOT NULL        // Car color, can't be null
    )
  `;
  
  // Execute the SQL query
  db.query(createTableQuery, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Return error message if query fails
    }
    res.json({ message: 'Database initialized and table created (if not exists)' }); // Success message
  });
});

// GET route to list all cars
app.get('/list', (req, res) => {
  // SQL query to select all rows from the cars table
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Return error if query fails
    }
    res.json(results); // Return the list of cars in JSON format
  });
});

// POST route to insert a new car
app.post('/insert', (req, res) => {
  // Extract car_name and color from the request body
  const { car_name, color } = req.body;

  // Check if both car_name and color are provided
  if (!car_name || !color) {
    return res.status(400).json({ error: 'Please provide both car name and color' }); // Return error if data is missing
  }

  // SQL query to insert a new car into the cars table
  const query = 'INSERT INTO cars (car_name, color) VALUES (?, ?)'; // '?' are placeholders for values
  db.query(query, [car_name, color], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Return error if query fails
    }
    res.status(201).json({ message: 'Car added successfully', id: result.insertId }); // Success message with the new car's ID
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message when server starts successfully
});
