var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["produits"])

router.get("/produits", function(req,res,next){
    db.produits.find(function(err,produits){
        if(err){
            res.send(err);
        }
        res.json(produits);
    })
})

router.get("/produits/:name", function(req,res,next){
    const name =req.params.name
    db.produits.find({
        _id: name
    },function(err,produits){
        if(err){
            res.send(err);
        }
        res.json(produits);
    })
})

module.exports = router;



















module.exports = router;