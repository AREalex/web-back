var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["catégories"])

router.get("/catégories", function(req,res,next){
    db.catégories.find(function(err,catégories){
        if(err){
            res.send(err);
        }
        res.json(catégories);
    })
})


router.get("/catégories/:name", function(req,res,next){
    const name =req.params.name
    db.catégories.find({
        type: name
    },function(err,catégories){
        if(err){
            res.send(err);
        }
        res.json(catégories);
    })
})

module.exports = router;