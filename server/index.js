// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// You will need this to deploy the application

const PORT = process.env.PORT || 3001;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(res => (console.log('We are in!! : ')))
  .catch(error => handleError(error));


const { Users } = require('./models/users');
const { Tickets } = require('./models/tickets');
const { Projects } = require('./models/projects');



app.get('/projects', async (req, res) => {
  const allProjects = await Projects.find({});
  console.log(allProjects);
  res.json(allProjects);
})

app.post('/projects', (req, res) => {
  let projectData = req.body;
  new Projects(projectData).save(err => {
    if (err) {
      res.json({error: err})
    };
  })
})

app.get('/projects/:id', (req, res) => {
  res.json({ message: 'Very good procect id' });
})

app.get('/users', async (req, res) => {
  const allUsers = await Users.find({});
  res.json(allUsers);
})

app.get('/users/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.get('/tickets', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.get('/ticket/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});