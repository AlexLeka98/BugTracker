const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    }
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = {
    projectSchema,
    Projects,
};















