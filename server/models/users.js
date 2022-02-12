const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    authority: {
        type: String,
        required: true,
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = {
    userSchema,
    Users,
};















