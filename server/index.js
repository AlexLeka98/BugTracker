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



// Get the specific project with the id passed in the params
app.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const resProj = await Projects.findById(id);
  resProj.users.map(item => typeof (item));
  const resProjPop = await resProj.populate('tickets').then(res => {
    return res.populate('users');
  })


  res.json(resProjPop)
  console.log('Get the specific project, and all user & tickets of the project');
  // res.json({ message: 'Very good procect id' });
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

// Add a new ticket to the Tickets model, and then push that ticket 
// to the project Id.
app.post('/projects/ticket/:projectId', async (req, res) => {
  let ticketData = req.body;
  console.log(ticketData);
  let projectId = req.params.projectId;
  const project = await Projects.findById(projectId);
  const newTicket = await new Tickets(ticketData);
  await newTicket.save();
  project.tickets.push(newTicket);
  await project.save();
  // const projectsPop = await project.populate('tickets');
  res.json(newTicket);
})

// Add a new user to the Users model, and then push that ticket 
// to the project Id.
app.post('/projects/users/:projectId', async (req, res) => {
  let userData = req.body;
  let projectId = req.params.projectId;
  const project = await Projects.findById(projectId);
  console.log(await project.populate('users'))
  const newUser = await new Users(userData);
  await newUser.save();
  project.users.push(newUser);
  await project.save();
  res.json(newUser);
})



app.delete('/projects', async (req, res) => {
  // let deleteId = req.body;
  console.log('projects delete');
  console.log(req.body.id);
  res.json(await Projects.findOneAndDelete({ _id: req.body.id }))
})

















// Delete a ticket from a project, then delete the ticket from everywhere.
app.delete('/projects/ticket', async (req, res) => {
  const projectId = req.body.projectId;
  const ticketId = req.body.ticketId;
  console.log("Project ID : ", projectId);
  console.log("Ticket ID : ", ticketId);
    
  const filter = { _id: projectId };
  Projects.findOne(filter).then(projectFound => {
    const foundProjectsFiltered = projectFound.tickets.filter(item => item.toString() !== ticketId);
    projectFound.tickets = foundProjectsFiltered;
    return projectFound.save()
  }).catch(error => {
    console.log(error);
  })
  await Tickets.findOneAndDelete({ _id:  ticketId});

  res.json({ name: 'ok' });
})


// Delete a ticket from a project.
app.delete('/projects/user', async (req, res) => {
  const projectId = req.body.projectId;
  const userId = req.body.userId;
  console.log("Project ID : ", projectId);
  console.log("User ID : ", userId);
    
  const filter = { _id: projectId };
  Projects.findOne(filter).then(projectFound => {
    // const foundProjectsFiltered = projectFound.users.filter(item => item.toString() !== userId);
    const foundProjectsFiltered = projectFound.users.filter(item => item.toString() === '');
    projectFound.users = foundProjectsFiltered;
    return projectFound.save()
  }).catch(error => {
    console.log(error);
  })
  // await Users.findOneAndDelete({ _id:  userId});

  res.json({ name: 'ok' });
})





















// USERS
app.get('/users', async (req, res) => {
  const allUsers = await Users.find({});
  res.json(allUsers);
})

app.get('/users/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.delete('/users', async (req, res) => {
  res.json(await Users.findOneAndDelete({ _id: req.body.id }))
})


// TICKETS
app.get('/tickets', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.post('/tickets', (req, res) => {
  console.log("I think i made it")
  res.json({ message: 'Hello from bruh!' });
})

app.get('/tickets/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.delete('/tickets', async (req, res) => {
  res.json(await Tickets.findOneAndDelete({ _id: req.body.id }))
})




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});