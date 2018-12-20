const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();



//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error in connecting MongoDB'))

//Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//Handlebars Middlewares
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Index Route
app.get('/', (req, res) => {
  const name = "Hello Kartik Chauhan";
  res.render('index', {
    Name: name
  });
});

//About Page
app.get('/about', (req, res) => {
  res.render('about');
});

//Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

//Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' })
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details' })
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(Idea => {
        res.redirect('/ideas')
      })
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})