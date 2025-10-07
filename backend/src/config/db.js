const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mycontacts_db';
        
        // Connect first
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
        
        // Get all collections
        const collections = await mongoose.connection.db.collections();
        
        // Drop all collections and their indexes
        for (let collection of collections) {
            try {
                // Drop all indexes first
                await collection.dropIndexes();
                console.log(`Dropped indexes for collection: ${collection.collectionName}`);
                
                // Then drop the collection
                await collection.drop();
                console.log(`Dropped collection: ${collection.collectionName}`);
            } catch (err) {
                console.log(`Error handling collection ${collection.collectionName}:`, err.message);
            }
        }
        
        console.log('Database reset complete');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;