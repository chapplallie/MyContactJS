const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 128
    },
    password: {
        type: String,
        required: true,
        maxlength: 128
    },
    deletedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

// validating password
UserSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Generating password
UserSchema.statics.generatePassword = function(length) {
    let result = "";
    const size = length ? length : 8;
    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const charactersLength = characters.length;
    for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// hashing password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };