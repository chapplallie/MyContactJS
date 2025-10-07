const { ObjectId } = require('mongodb');

// Helper function to convert string to ObjectId
const toObjectId = (id) => {
    try {
        return typeof id === 'string' ? new ObjectId(id) : id;
    } catch (error) {
        console.error('Invalid ObjectId:', error);
        return null;
    }
};

module.exports = { toObjectId };