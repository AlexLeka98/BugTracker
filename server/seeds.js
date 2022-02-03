const express = require("express");
const mongoose = require("mongoose");
const { Users } = require('./models/users');
const { Tickets } = require('./models/tickets');
const { Projects } = require('./models/projects');

const app = express();

mongoose.connect('mongodb://localhost:27017/myapp')
    .then(res => (console.log('We are in!! : ')))
    .catch(error => handleError(error));


const USER_DUMMY = [
    {
        name: 'Alex',
        surname: 'Leka',
        authority: 'admin',
    },
    {
        name: 'Mario',
        surname: 'Leka',
        authority: 'dev',
    },
    {
        name: 'Niko',
        surname: 'Adipa',
        authority: 'dev',
    },
    {
        name: 'Mark',
        surname: 'Gohn',
        authority: 'dev',
    },
]

const PROJECT_DUMMY = [
    {
        title: 'Next facebook',
        description: 'This is the next facebook 100%.',
        author: 'admin',
    },
    {
        title: 'Next Twitter',
        description: 'This is the next twitter, we are getting rich.',
        author: 'dev',
    },
    {
        title: 'Next Youtube',
        description: 'This is the next youtube, probably going to be name YouTub.',
        author: 'dev',
    },
    {
        title: 'Next Reddit',
        description: 'Next Reddit, aka Redit.',
        author: 'dev',
    },
]

const TICKET_DUMMY = [
    {
        title: 'Database Bug',
        description: 'Component has a big problem and it can not load no matter what.',
        author: 'Aleksander Leka',
        type:'bug',
    },
    {
        title: 'Component doesnt load',
        description: 'Component has a big problem and it can not load no matter what.',
        author: 'Aleksander Leka',
        type:'Issue',
    },
    {
        title: 'Autharization problem',
        description: 'Component has a big problem and it can not load no matter what.',
        author: 'Aleksander Leka',
        type:'feature-request',
    },
    {
        title: 'Mark',
        description: 'Component has a big problem and it can not load no matter what.',
        author: 'Aleksander Leka',
        type:'bug',
    },
]



const feedDataBase = () => {
    USER_DUMMY.map(item => {
        new Users(item).save(err => {
            if (err) {
                console.log(err);
            };
        })
    });

    TICKET_DUMMY.map(item => {
        new Tickets(item).save(err => {
            if (err) {
                console.log(err);
            };
        })
    });

    PROJECT_DUMMY.map(item => {
        new Projects(item).save(err => {
            if (err) {
                console.log(err);
            };
        })
    });
}

// feedDataBase();


 