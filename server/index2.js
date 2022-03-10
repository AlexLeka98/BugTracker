// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// You will need this to deploy the application

const PORT = process.env.PORT || 3001;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/hello',(req,res)=> {
    res.json({message:'Hello fker'});
})




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});