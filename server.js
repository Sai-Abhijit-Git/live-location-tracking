const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store current location (in production, you'd use a database)
let currentLocation = {
  latitude: null,
  longitude: null,
  timestamp: null,
  accuracy: null
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/share', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'share.html'));
});

app.get('/track', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'track.html'));
});

app.get('/map-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'map-test.html'));
});

// REST API endpoints
app.post('/api/location', (req, res) => {
  const { latitude, longitude, accuracy } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  currentLocation = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    accuracy: accuracy ? parseFloat(accuracy) : null,
    timestamp: new Date().toISOString()
  };

  // Broadcast to all connected tracking clients
  io.emit('locationUpdate', currentLocation);
  
  res.json({ 
    success: true, 
    message: 'Location updated successfully',
    location: currentLocation 
  });
});

app.get('/api/location', (req, res) => {
  res.json(currentLocation);
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current location to newly connected client
  if (currentLocation.latitude && currentLocation.longitude) {
    socket.emit('locationUpdate', currentLocation);
  }
  
  // Handle location updates from sharing clients
  socket.on('shareLocation', (locationData) => {
    currentLocation = {
      ...locationData,
      timestamp: new Date().toISOString()
    };
    
    // Broadcast to all other clients
    socket.broadcast.emit('locationUpdate', currentLocation);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Location tracking server running on port ${PORT}`);
  console.log(`📱 Share location: http://localhost:${PORT}/share`);
  console.log(`🗺️  Track location: http://localhost:${PORT}/track`);
});
