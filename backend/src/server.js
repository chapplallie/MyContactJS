const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/database');
const UserRoute = require('./routes/user.routes');
const { swaggerSpec, swaggerUi } = require('./swagger/swaggerConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize routes
const userRoute = new UserRoute();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ 
        message: 'MyContacts API',
        status: 'Running',
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User route
app.use('/api', userRoute.router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDatabase();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = { app };