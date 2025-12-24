const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Routes
const feedbacksRouter = require('./routes/feedbacks');
const whatsappRouter = require('./routes/whatsapp');
const telegramRouter = require('./routes/telegram');
const azureAiRouter = require('./routes/azure-ai');
const callCenterRouter = require('./routes/call-center');
const surveysRouter = require('./routes/surveys');
const qrCodesRouter = require('./routes/qr-codes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make io accessible to routes
app.set('io', io);

// API Routes
app.use('/api/feedbacks', feedbacksRouter);
app.use('/api/webhook/whatsapp', whatsappRouter);
app.use('/api/webhook/telegram', telegramRouter);
app.use('/api/ai', azureAiRouter);
app.use('/api/call-center', callCenterRouter);
app.use('/api/surveys', surveysRouter);
app.use('/api/qr-codes', qrCodesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OBA CRM Backend is running' });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 OBA CRM Backend running on http://localhost:${PORT}`);
});

module.exports = { app, io };
