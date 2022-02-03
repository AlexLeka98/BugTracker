// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// You will need this to deploy the application

const PORT = process.env.PORT || 3001;

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(res => (console.log('We are in!! : ')))
  .catch(error => handleError(error));


const { Users } = require('./models/users');



app.get('/projects', (req, res) => {
  res.json({ message: 'Very good project' });
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