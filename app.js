// app.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'nottingham', 
  database: 'car', 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON bodies (built-in with Express)
app.use(express.json());

// Middleware to parse URL-encoded bodies (if needed)
app.use(express.urlencoded({ extended: true }));

// Route to initialize the database and create the table
app.get('/init-db', (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cars (
      id INT AUTO_INCREMENT PRIMARY KEY,
      car_name VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL
    )
  `;
  
  db.query(createTableQuery, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Database initialized and table created (if not exists)' });
  });
});

// GET route to list all cars
app.get('/list', (req, res) => {
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST route to insert a new car
app.post('/insert', (req, res) => {
  const { car_name, color } = req.body;

  if (!car_name || !color) {
    return res.status(400).json({ error: 'Please provide both car name and color' });
  }

  const query = 'INSERT INTO cars (car_name, color) VALUES (?, ?)';
  db.query(query, [car_name, color], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Car added successfully', id: result.insertId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
