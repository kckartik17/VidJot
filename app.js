const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');

const app = express();



//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
  useNewUrlParser:true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Error in connecting MongoDB'))

//Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//Handlebars Middlewares
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');


//Index Route
app.get('/',(req,res) => {
  const name = "Hello Kartik Chauhan";
  res.render('index', {
    Name:name
  });
});

//About Page
app.get('/about',(req,res) => {
  res.render('about');
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})