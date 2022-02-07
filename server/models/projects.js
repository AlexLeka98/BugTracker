const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    contributors: [{ name: String, surname: String }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }],
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = {
    projectSchema,
    Projects,
};















