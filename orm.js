const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

app.use(express.json());

const sequelize = new Sequelize('car', 'root', 'myPa$$word', {
    host: 'localhost',
    dialect: 'mysql',
});

const Car = sequelize.define('Car', {
    car_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'cars',
    timestamps: false,
});

app.get('/orm/list', async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
})

app.post('/orm/insert', async (req, res) => {
  const { car_name, color } = req.body;

  try {
    const newCar = await Car.create({ car_name, color });
    console.log(newCar);
    res.status(201).json({ message: 'Car added successfully', id: newCar.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});