// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//(DATA)
// =============================================================
var reservations = [
  {
    routeName: "questionmark",
    name: "Lauren",
    number: "555-555-5555",
    email: "email@email.com",
    uniqueID: "lololo"
  },
 
];

var waitlist = [
    {
      routeName: "lateso",
      name: "Late person",
      number: "555-555-5555",
      email: "email@theinternet.com",
      uniqueID: "lateso"
    },
   
  ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/makeReservation", function(req, res) {
  res.sendFile(path.join(__dirname, "makeReservation.html"));
});

app.get("/viewres", function(req, res) {
    res.sendFile(path.join(__dirname, "viewres.html"));
  });

app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });


app.post("/api/reservations", function(req, res) {

  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);


  res.json(newReservation);

  if (reservations.length < 5) {
    reservations.push(newReservation);
  } else if (reservations.length >= 5) {
    waitlist.push(newReservation);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + "http://localhost:" + PORT);
});
