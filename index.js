const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const TaxiRide = require("./taxulator");
const flash = require("express-flash");
const session = require("express-session");

const app = express();

const taxulator = TaxiRide();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);
app.set("view engine", "handlebars");

// initialise session middleware - flash-express depends on it
app.use(
  session({
    secret: "message",
    resave: false,
    saveUninitialized: true
  })
);

// initialise the flash middleware
app.use(flash());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index");
});

app.get('/menu', function(req, res){
  let taxiType = req.body.typeOfTaxi
  taxulator.chooseTaxi(taxiType);
res.render('option1');
});

app.get('/calculateFare', function(req, res){
  res.render('destination');
});

app.get('/taxiMath', function(req, res){
  res.render('taxi_math');
});

app.get('/taxiFareTotal', function(req, res){
  res.render('taxi_total');
});

const PORT = process.env.PORT || 4422;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
