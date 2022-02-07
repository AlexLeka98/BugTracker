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




// PROJECTS
app.get('/projects', async (req, res) => {
  const allProjects = await Projects.find({});
  res.json(allProjects);
})

// Receive all tickets from the project with the corresponding id
// passed in req.params.
app.get('/projects/tickets/:projectId', async (req, res) => {
  const allProjects = await Projects.find({});
  res.json(allProjects);
})

// Add a new project to the Project Model.
app.post('/projects', async (req, res) => {
  let projectData = req.body;
  const newProject = new Projects(projectData);
  newProject.save().then(newProj => {
    res.json(newProj);
  }).catch(err => {
    res.json({ error: err });
  })
})

// Add a new ticket to the Ticket model, and then push that ticket 
// to the project Id.
app.post('/projects/ticket/:projectId', async (req, res) => {
  let ticketData = req.body;
  let projectId = req.params.projectId;
  const project = await Projects.findById(projectId);
  const newTicket = await new Tickets(ticketData);
  await newTicket.save();
  project.push(newTicket);
  await project.save();
  res.json({ hello: 'ldasdsa' });
})

app.delete('/projects', async (req, res) => {
  // let deleteId = req.body;
  console.log(req.body.id);
  res.json(await Projects.findOneAndDelete({ _id: req.body.id }))
})

app.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const resProj = await Projects.findById(id);
  res.json(resProj)
  // res.json({ message: 'Very good procect id' });
})



// USERS
app.get('/users', async (req, res) => {
  const allUsers = await Users.find({});
  res.json(allUsers);
})

app.get('/users/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})


// TICKETS
app.get('/tickets', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.post('/tickets', (req, res) => {
  console.log("I think i made it")
  res.json({ message: 'Hello from bruh!' });
})

app.get('/ticket/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});