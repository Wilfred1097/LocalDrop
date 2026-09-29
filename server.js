const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Use a Map or an object to track connected devices by socket.id
const activeDevices = new Map();

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // 1. When a device registers its name and type
    socket.on('register-device', (data) => {
        const clientIp = socket.handshake.address.replace(/^.*:/, ''); // clean IP
        
        // Save device info mapped directly to socket.id
        activeDevices.set(socket.id, {
            id: socket.id,
            name: data.name,
            type: data.type,
            ip: clientIp === '1' ? '127.0.0.1' : clientIp
        });

        broadcastDeviceList();
    });

    // 2. Handle connection request and grab the name accurately
    socket.on('connection-request', ({ to, fileName, fileSize }) => {
        const sender = activeDevices.get(socket.id);
        const senderName = sender ? sender.name : 'Unknown Device';

        console.log(`Connection request from ${senderName} (${socket.id}) to ${to}`);

        io.to(to).emit('connection-request', { 
            from: socket.id, 
            senderName: senderName, 
            fileName, 
            fileSize 
        });
    });

    socket.on('connection-response', ({ to, accepted }) => {
        io.to(to).emit('connection-response', { accepted });
    });

    // Handle WebRTC signaling
    socket.on('rtc-offer', ({ to, offer }) => {
        io.to(to).emit('rtc-offer', { from: socket.id, offer });
    });

    socket.on('rtc-answer', ({ to, answer }) => {
        io.to(to).emit('rtc-answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
        io.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    // Clean up on disconnect
    socket.on('disconnect', () => {
        activeDevices.delete(socket.id);
        broadcastDeviceList();
        console.log('A user disconnected:', socket.id);
    });
});

function broadcastDeviceList() {
    const devices = Array.from(activeDevices.values());
    io.emit('update-device-list', devices);
}

server.ensureListen = server.listen(3000, () => {
    console.log('LocalDrop server running on http://localhost:3000');
});