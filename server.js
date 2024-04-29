const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');  // Add session middleware for login sessions

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://medievalcivilizations.online",
        methods: ["GET", "POST"]
    }
});

// Use session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Basic user login data handling - for demonstration purposes only
const users = {}; // This should be a database or similar in production

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', ({username, password}) => {
        // This should check against a database in production
        if (users[username] && users[username].password === password) {
            console.log(username + ' logged in successfully');
            socket.emit('loginSuccess', { message: 'Login successful' });
        } else {
            console.log(username + ' failed to log in');
            socket.emit('loginError', { message: 'Invalid username or password' });
        }
    });

    socket.on('register', ({username, password}) => {
        if (!users[username]) {
            users[username] = {password}; // Simple password storage (unsafe)
            console.log(username + ' registered successfully');
            socket.emit('registerSuccess', { message: 'Registration successful' });
        } else {
            console.log(username + ' registration failed');
            socket.emit('registerError', { message: 'Username already taken' });
        }
    });

    socket.on('chatMessage', (msg) => {
        console.log('Message received:', msg);
        io.emit('chatMessage', { user: socket.username, message: msg }); // Broadcast to all clients
    });

    socket.on('message', (data) => {
        console.log(data);
        // Example processing and response
        io.emit('message', 'Update from server');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

