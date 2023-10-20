const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var cors = require("cors");
const app = express();
app.use(cors());

const port = 5000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'harika',
  database: 'tensorgo',
});

// Create the UserMaster table
db.query(`CREATE TABLE IF NOT EXISTS UserMaster (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  gender VARCHAR(255),
  status VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
)`);

// Fetch data from the API and store it in the database
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://gorest.co.in/public-api/users', {
      headers: {
        Authorization: 'Bearer 9101f67824e746ea8a08738ead54c5c45ba829ce85b803041bba5996b3dbe819', // Replace with your API token
      },
    });
    const userData = response.data.data;

    userData.forEach((user) => {
      const { name, email, gender, status, created_at, updated_at } = user;
      db.query(
        'INSERT INTO UserMaster (name, email, gender, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, gender, status, created_at, updated_at],
        (error, results) => {
          if (error) {
            console.error('Error inserting data into the database: ' + error);
          } else {
            console.log('Data inserted successfully');
          }
        }
      );
    });

    res.send(userData);
  } catch (error) {
    console.error('Error fetching and storing data: ' + error);
    res.status(500).send('Error fetching and storing data.');
  }
});

// Create a CSV export route
app.get('/exportCSV', async (req, res) => {
  const csvWriter = createCsvWriter({
    path: 'user_data.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'gender', title: 'Gender' },
      { id: 'status', title: 'Status' },
      { id: 'created_at', title: 'Created At' },
      { id: 'updated_at', title: 'Updated At' },
    ],
  });

  const data = await db.promise().query('SELECT name, email, gender, status, created_at, updated_at FROM UserMaster');
  csvWriter.writeRecords(data[0])
    .then(() => {
      res.download('user_data.csv');
    });
});

// Create a route to update user data in the database
app.post('/updateUser', (req, res) => {
  const { id, name, email, gender, status, created_at, updated_at } = req.body;
  db.query(
    'UPDATE UserMaster SET name = ?, email = ?, gender = ?, status = ?, created_at = ?, updated_at = ? WHERE Id = ?',
    [name, email, gender, status, created_at, updated_at, id],
    (err) => {
      if (err) {
        res.status(500).send('Error updating user data.');
      } else {
        res.send('User data updated successfully.');
      }
    }
  );
});

app.get('/getUsers/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convert the ID parameter to an integer
  
    // Query the database to find the user by their ID
    db.query('SELECT * FROM UserMaster WHERE Id = ?', [userId], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error retrieving user data' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const user = results[0]; // Assuming the user is found
        res.json(user);
      }
    });
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
