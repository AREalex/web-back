var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

var index = require("./routes/index")
var users = require("./routes/users")
var produits = require("./routes/produits")


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