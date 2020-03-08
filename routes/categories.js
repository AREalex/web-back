var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["categories"])

router.get("/categories", function(req,res,next){
    db.categories.find(function(err,categories){
        if(err){
            res.send(err);
        }
        res.json(categories);
    })
})


router.get("/categories/:name", function(req,res,next){
    const name =req.params.name
    db.categories.find({
        type: name
    },function(err,categories){
        if(err){
            res.send(err);
        }
        res.json(categories);
    })
})

module.exports = router;