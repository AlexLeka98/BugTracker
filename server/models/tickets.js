const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true,
    },
    type:{
        type:String,
        require:true,
    }
});

const Tickets = mongoose.model('Tickets', ticketSchema);

module.exports = {
    ticketSchema,
    Tickets,
};















