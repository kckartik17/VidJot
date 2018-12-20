const express = require('express');
const exphbs = require('express-handlebars')

const app = express();

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