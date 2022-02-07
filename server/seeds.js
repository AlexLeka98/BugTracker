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
        title: 'Bug Tracker',
        description: 'But tracking software for professional software development.',
        author: 'Aleksander Leka',
        contributors: [{name:'Nick',surname:'Papadopoulos'}]
    },
    {
        title: 'Facebook 2.0',
        description: 'New facebook, because Zuckerberg has lost his mind.',
        author: 'Aleksander Leka',
        contributors: []
    },
    {
        title: 'Tesla autopilot',
        description: 'Solving full autonomous autopilot for electric vehicles.',
        author: 'Aleksander Leka',
        contributors: []
    },
    {
        title: 'Retid',
        description: 'The infamous Reddit project, AKA Retid will be deployed very soon.',
        author: 'Aleksander Leka',
        contributors: []
    },
    {
        title: 'Tesla',
        description: 'We building cars.',
        author: 'Aleksander Leka',
        contributors: []
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
    // USER_DUMMY.map(item => {
    //     new Users(item).save(err => {
    //         if (err) {
    //             console.log(err);
    //         };
    //     })
    // });

    // TICKET_DUMMY.map(item => {
    //     new Tickets(item).save(err => {
    //         if (err) {
    //             console.log(err);
    //         };
    //     })
    // });

    PROJECT_DUMMY.map(item => {
        new Projects(item).save(err => {
            if (err) {
                console.log(err);
            };
        })
    });
}



feedDataBase();


 