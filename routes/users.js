var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["users"])

router.get("/users", function(req,res,next){
    db.users.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
})

router.get("/users/:name", function(req,res,next){
    const name =req.params.name
    db.users.find({
        email: name
    },function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
})

module.exports = router;