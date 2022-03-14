// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// You will need this to deploy the application

const PORT = process.env.PORT || 3000;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const mongoDatabase = 'mongodb+srv://alexluwees:Colege697@cluster0.n1dil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoDBURI = 'mongodb+srv://alexluwees:Colege697@cluster0.n1dil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const localDatabase = 'mongodb://localhost:27017/myapp';
mongoose.connect(localDatabase)
  .then(res => (console.log('We are ooooon!')))
  .catch(error => console.log(error));


const { Users } = require('./models/users');
const { Tickets } = require('./models/tickets');
const { Projects } = require('./models/projects');
const { response } = require("express");




// PROJECTS
app.get('/projects', async (req, res) => {
  console.log('All projects');
  const allProjects = await Projects.find({});
  // res.json({message:'allprojects'});
  res.json(allProjects);
})

// Get the specific project with the id passed in the params
app.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Projects.findById(id);
  const resProjPop = await project.populate('tickets').then(res => {
    return res.populate('users');
  });


  await Promise.all(resProjPop.tickets.map(async ticket => {
    // console.log("The ticket:  ",ticket)
    // let aa = await Promise.all(ticket.comments.map(async (comment, index) => {
    await Promise.all(ticket.comments.map(async (comment, index) => {
      await ticket.populate(`comments.${index}.user`);
      // const popComment = await ticket.populate(`comments.${index}.user`);
      // return popComment;
    }));
    // return aa;
  }))
  res.json(resProjPop);
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
  console.log('I am ahererereer');
  let ticketData = req.body;
  let projectId = req.params.projectId;  // Get the project Id from params
  const project = await Projects.findById(projectId); //Find the project with the projectId
  const newTicket = await new Tickets(ticketData); //Create a new ticket with the ticketData

  newTicket.projectId = project;  // newTicket.projectId is now objectId ref of the project.
  await newTicket.save();  // Saving the newTicket with the new objectId ref.
  project.tickets.push(newTicket);
  await project.save();
  res.json(newTicket);
})

// Add a new user to the Users model, and then push that ticket 
// to the project Id.
app.post('/projects/users/:projectId', async (req, res) => {
  let userData = req.body;
  const foundUsers = await Users.find({
    '_id': {
      $in: userData.map(item => mongoose.Types.ObjectId(item.id))
    }
  });

  let projectId = req.params.projectId;
  const project = await Projects.findById(projectId);
  foundUsers.map(user => {
    project.users.push(user);
  })
  await project.save();
  res.json(foundUsers);
})




app.put('/tickets/:id', (req, res) => {
  let newTicket = req.body;
  let { id: ticketId } = req.params;

  Tickets.findByIdAndUpdate(ticketId, newTicket, { new: true }).then(response => {
    res.json(response);
  }).catch(err => {
    res.json({ error: err });
  })
})

app.post('/tickets/:ticketId/comment', async (req, res) => {
  const ticket = await Tickets.findById(req.params.ticketId);
  const user = await Users.findById(req.body.userId)
  console.log("This is the user: ", user);
  const newComment = {
    user: user,
    comment: req.body.comment,
    date: req.body.date,
    _id: new mongoose.Types.ObjectId(),
  }
  await ticket.comments.unshift(newComment);
  await ticket.save();
  let populatedTicket = await Promise.all(ticket.comments.map(async (comment, index) => {
    const popComment = await ticket.populate(`comments.${index}.user`);
    // console.log(popComment.comments);
    return popComment;
    // return await ticket.populate(`comments.${index}.user`)
  }));
  console.log("Populated ticket: ", populatedTicket[ticket.comments.length - 1].comments[0].user.username);
  res.json(populatedTicket[ticket.comments.length - 1]);
})

app.delete('/tickets/:ticketId/comment', async (req, res) => {
  const { id } = req.body;
  console.log(req.params.ticketId, " <-----");
  const ticket = await Tickets.findById(req.params.ticketId);
  const newTicket = ticket.comments.filter(comment => {
    if (comment._id.toString() !== id) {
      return comment
    }
  });
  ticket.comments = newTicket;
  await ticket.save();
  res.json(ticket);
})







app.delete('/projects', async (req, res) => {
  res.json(await Projects.findOneAndDelete({ _id: req.body.id }))
})

















// Delete a ticket from a project, then delete the ticket from everywhere.
app.delete('/projects/ticket', async (req, res) => {
  const projectId = req.body.projectId;
  const ticketId = req.body.ticketId;

  const filter = { _id: projectId };
  Projects.findOne(filter).then(projectFound => {
    const foundProjectsFiltered = projectFound.tickets.filter(item => item.toString() !== ticketId);
    projectFound.tickets = foundProjectsFiltered;
    return projectFound.save()
  }).catch(error => {
    console.log(error);
  })
  await Tickets.findOneAndDelete({ _id: ticketId });

  res.json({ name: 'ok' });
})


// Delete a user from a project.
app.delete('/projects/user', async (req, res) => {
  const projectId = req.body.projectId;
  const userId = req.body.userId;

  const filter = { _id: projectId };
  Projects.findOne(filter).then(projectFound => {
    // const foundProjectsFiltered = projectFound.users.filter(item => item.toString() !== userId);
    const foundProjectsFiltered = projectFound.users.filter(item => item.toString() !== userId);
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
  console.log('users');
  const allUsers = await Users.find({});
  res.json(allUsers);
})

app.get('/users/:id', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.post('/users', async (req, res) => {
  console.log('New User incoming ');
  const newUserData = req.body;
  const newUser = new Users(newUserData);
  console.log(newUser);
  await newUser.save();
  res.json(newUser);
})

app.put('/users/:id', async (req, res) => {
  let userId = req.params.id;
  let newUser = req.body;
  Users.findByIdAndUpdate(userId, newUser, { new: true }).then(response => {
    res.json(response);
  }).catch(err => {
    res.json({ error: err });
  })
})


app.delete('/users', async (req, res) => {
  const response = await Users.findOneAndDelete({ _id: req.body.id })
  res.json(response)
})


// TICKETS
app.get('/tickets', async (req, res) => {
  const allTickets = await Tickets.find({});

  let popTickets = await Promise.all(allTickets.map(async (ticket) => {
    return await ticket.populate('projectId');
  }));

  res.json(popTickets);
})

app.post('/tickets', (req, res) => {
  res.json({ message: 'Hello from bruh!' });
})

app.get('/tickets/:id', async (req, res) => {
  const ticket = await Tickets.findById(req.params.id);
  res.json(ticket);
})

app.delete('/tickets', async (req, res) => {
  res.json(await Tickets.findOneAndDelete({ _id: req.body.id }))
})




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});