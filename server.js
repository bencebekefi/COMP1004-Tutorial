const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Define users array
let users = [];

// Endpoint for user login
app.post('/login', (req, res) => {
    console.log('Received POST request to /login:', req.body);
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log('Login successful for user:', username);
        res.status(200).json({ message: 'Login successful' });
    } else {
        console.log('Login failed for user:', username);
        res.status(401).json({ error: 'Login failed' });
    }
});

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        users.push({ username, password }); // Add new user to the array
        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// Endpoint for account deletion
app.delete('/deleteAccount', (req, res) => {
    const username = req.query.username;
    console.log('DELETE request received for username:', username);
    if (!users) {
        res.status(500).json({ message: 'Users array is not defined' });
        return;
    }
    const initialLength = users.length;
    users = users.filter(user => user.username !== username);
    if (initialLength === users.length) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.status(200).json({ message: 'Account deleted successfully' });
    }
});

// Endpoint to save table data
app.post('/saveData', (req, res) => {
    console.log('Received POST request to /saveData:', req.body);
    const { username, password, website } = req.body;
    // Your existing validation and saving logic here
    

    // Here you can handle the received data, for example, save it to a database
    console.log('Received data to save:', req.body);
    // Respond with a success message
    res.status(200).json({ message: 'Data saved successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
