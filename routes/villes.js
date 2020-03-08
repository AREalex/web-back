var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["villes"])

router.get("/villes", function(req,res,next){
    db.villes.find(function(err,villes){
        if(err){
            res.send(err);
        }
        res.json(villes);
    })
})

router.get("/villes/:name", function(req,res,next){
    const name =req.params.name
    db.villes.find({
        Nom: name
    },function(err,villes){
        if(err){
            res.send(err);
        }
        res.json(villes);
    })
})

module.exports = router;