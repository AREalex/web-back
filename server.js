var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require('morgan');  
var passport = require('passport');  
var jwt = require('jsonwebtoken');  

var index = require("./routes/index")
var users = require("./routes/users")
var produits = require("./routes/produits")
var panier = require("./routes/panier")
var villes = require("./routes/villes")
var categories = require("./routes/categories")




var app = express()


app.use(cors())

app.listen(process.env.PORT || 9090);

//Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.use("/",index);
app.use("/api",users);
app.use("/api",produits);
app.use("/api",panier);
app.use("/api",categories);
app.use("/api",villes);

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

// Log les requêtes
app.use(morgan('dev'));  

// Route d'accueil
app.get('/', function(req, res) {  
  res.send('Home');
});