const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Array to store registered users (for demonstration purposes)
let users = [];

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Endpoint for serving login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

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
    // Check if username and password are provided
    if (username && password) {
        // Add new user to the users array
        users.push({ username, password });
        console.log("New user registered:", username); // Log the registered username
        res.status(200).json({ message: 'Registration successful' });
    } else {
        console.error("Registration failed: Missing username or password"); // Log registration failure
        res.status(400).json({ error: 'Registration failed' });
    }
});

// Endpoint to delete user account
app.delete('/deleteAccount', (req, res) => {
    const { username } = req.body;
    // Implement account deletion logic here
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
