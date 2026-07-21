const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

const rooms = {};

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('create-room', (callback) => {
        let code;
        do {
            code = generateRoomCode();
        } while (rooms[code]);

        rooms[code] = {
            players: [{ id: socket.id, color: 'black' }],
            board: null,
            currentTurn: 1,
            gameStarted: false
        };

        socket.join(code);
        socket.roomCode = code;
        socket.playerColor = 'black';

        callback({ success: true, code, color: 'black' });
        console.log(`Room ${code} created by ${socket.id}`);
    });

    socket.on('join-room', (code, callback) => {
        const room = rooms[code];
        if (!room) {
            callback({ success: false, error: 'Phòng không tồn tại!' });
            return;
        }
        if (room.players.length >= 2) {
            callback({ success: false, error: 'Phòng đã đầy!' });
            return;
        }

        room.players.push({ id: socket.id, color: 'white' });
        room.gameStarted = true;

        socket.join(code);
        socket.roomCode = code;
        socket.playerColor = 'white';

        callback({ success: true, code, color: 'white' });

        io.to(code).emit('game-start', {
            players: room.players.map(p => ({ id: p.id, color: p.color }))
        });

        console.log(`User ${socket.id} joined room ${code}`);
    });

    socket.on('make-move', (data) => {
        const roomCode = socket.roomCode;
        if (!roomCode || !rooms[roomCode]) return;

        socket.to(roomCode).emit('opponent-move', {
            row: data.row,
            col: data.col,
            color: socket.playerColor
        });
    });

    socket.on('chat-message', (message) => {
        const roomCode = socket.roomCode;
        if (!roomCode) return;
        io.to(roomCode).emit('chat-message', {
            sender: socket.playerColor,
            message
        });
    });

    socket.on('restart-game', () => {
        const roomCode = socket.roomCode;
        if (!roomCode || !rooms[roomCode]) return;
        io.to(roomCode).emit('game-restarted');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const roomCode = socket.roomCode;
        if (roomCode && rooms[roomCode]) {
            socket.to(roomCode).emit('opponent-disconnected');
            rooms[roomCode].players = rooms[roomCode].players.filter(p => p.id !== socket.id);
            if (rooms[roomCode].players.length === 0) {
                delete rooms[roomCode];
                console.log(`Room ${roomCode} deleted (empty)`);
            }
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
