const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

//Load Routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

//Passport Config
require("./config/passport")(passport);

//DB config
const db = require("./config/database");

//Connect to mongoose
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log("Error in connecting MongoDB"));

//Handlebars Middlewares
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Method Override Middleware
app.use(methodOverride("_method"));

//Express session Middlewares
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Index Route
app.get("/", (req, res) => {
  const name = "Hello Kartik Singh Chauhan";
  res.render("index", {
    Name: name
  });
});

//About Page
app.get("/about", (req, res) => {
  res.render("about");
});

//Use Routes
app.use("/ideas", ideas);
app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
