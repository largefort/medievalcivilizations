// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {}; // Store users in memory
const servers = []; // Store servers in memory
const guilds = {}; // Store guilds in memory
const players = {}; // Store player data in memory

const secretKey = process.env.SECRET_KEY;

// Middleware for parsing JSON bodies
app.use(express.json());

// User registration endpoint
app.post('/register', (req, res) => {
    const { email, username } = req.body;
    const password = uuidv4().slice(0, 12); // Generate a strong password
    const hashedPassword = bcrypt.hashSync(password, 8);

    users[email] = { email, username, password: hashedPassword };
    res.json({ email, username, password });
});

// User login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users[email];

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email }, secretKey);
        res.json({ token });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

// Endpoint to get available servers
app.get('/servers', (req, res) => {
    res.json(servers);
});

// Endpoint to create a new server
app.post('/create-server', (req, res) => {
    const serverId = uuidv4();
    servers.push({ id: serverId, name: `Server ${servers.length + 1}` });
    res.json({ id: serverId });
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinServer', (serverId) => {
        socket.join(serverId);
        console.log(`User ${socket.id} joined server ${serverId}`);
    });

    socket.on('createGuild', (data) => {
        const guildId = uuidv4();
        guilds[guildId] = { id: guildId, name: data.guildName };
        socket.emit('guildCreated', guilds[guildId]);
    });

    socket.on('joinGuild', (data) => {
        const guild = guilds[data.guildId];
        if (guild) {
            players[socket.id] = players[socket.id] || {};
            players[socket.id].guild = guild.id;
            console.log(`User ${socket.id} joined guild ${guild.name}`);
        }
    });

    socket.on('updatePlayerLevel', (data) => {
        players[socket.id] = players[socket.id] || {};
        players[socket.id].level = data.level;
        socket.emit('updatePlayerLevel', players[socket.id].level);
        const rank = calculateRank(players[socket.id].level);
        players[socket.id].rank = rank;
        socket.emit('updatePlayerRank', players[socket.id].rank);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

function calculateRank(level) {
    if (level >= 10) return 'King';
    return 'Lord';
}

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
