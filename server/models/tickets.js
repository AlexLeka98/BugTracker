const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        require: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        require: true,
    },
    days: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    comments:
        // type: [{ username: String, surname: String, comment: String, date: Date }]
        [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'

            },
            comment: String,
            date: Date
        }],
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    }
});

const Tickets = mongoose.model('Tickets', ticketSchema);

module.exports = {
    ticketSchema,
    Tickets,
};















