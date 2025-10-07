const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 80
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 80
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        maxlength: 20
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

// Create a compound index on firstname, lastname, phone, and createdBy to prevent exact duplicates for the same user
ContactSchema.index({ firstname: 1, lastname: 1, phone: 1, createdBy: 1 }, { unique: true });

const ContactModel = mongoose.model('Contact', ContactSchema);

// Drop the firstname unique index if it exists
ContactModel.collection.dropIndex('firstname_1')
    .then(() => {
        console.log('Successfully dropped firstname unique index');
    })
    .catch((err) => {
        // Ignore if index doesn't exist
        if (err.code !== 27) {
            console.error('Error dropping index:', err);
        }
    });

module.exports = { ContactModel };