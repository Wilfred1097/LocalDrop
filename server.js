const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Store connected devices
const connectedDevices = {};

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for device registration with custom details
    socket.on('register-device', (deviceInfo) => {
        connectedDevices[socket.id] = {
            id: socket.id,
            name: deviceInfo.name || 'Anonymous Device',
            type: deviceInfo.type || 'Browser',
            ip: socket.handshake.address.replace('::ffff:', '') // Clean up IPv4 formatting
        };
        
        // Broadcast updated device list to ALL connected clients
        io.emit('update-device-list', Object.values(connectedDevices));
    });

    // WebRTC Signaling relays
    socket.on('rtc-offer', ({ to, offer }) => {
        io.to(to).emit('rtc-offer', { from: socket.id, offer });
    });

    socket.on('rtc-answer', ({ to, answer }) => {
        io.to(to).emit('rtc-answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
        io.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete connectedDevices[socket.id];
        io.emit('update-device-list', Object.values(connectedDevices));
    });
});

// Helper function to find your local network IP
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log(`🚀 LocalDrop server running!`);
    console.log(`> Open on this machine: http://localhost:${PORT}`);
    console.log(`> Open on other network devices: http://${localIP}:${PORT}`);
});