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

app.post('/taxiMath', function(req, res){
  let from = req.body.locationFrom
  let to = req.body.locationTo

  taxulator.tripSetUp(from, to)
  res.render('taxi_math', {
    fare: "R" + taxulator.getFare()
  });
});


app.post('/taxiFareTotal', function(req, res){
  let numberOfPassengers = req.body.numberOfPassengers
  let amountPaid = req.body.amountPaid
  let taxifare = taxulator.getFare();

  taxulator.calcTotalBill(taxifare, numberOfPassengers)
  taxulator.calcPassChange(taxifare, amountPaid)
   
  res.render('taxi_total',{
        total: "R" + taxulator.getTaxiBill(),
        change: 'R' + taxulator.getChange()
  });
});

app.get('/taxiFareTotal', function(req, res){

  taxulator.calcTotalBill()

  res.render('taxi_total',{
        total: 'R0.00',
        change: 'R0.00'
  });
});

app.get('/taxiCondition', function(req, res){
  res.render('taxi_condition');
});

app.get('/backToMenu', function(req, res){
  res.render('option1');
});


const PORT = process.env.PORT || 4422;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
