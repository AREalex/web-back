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

router.post("/users", function(req,res,next){
    var {user} = req.body

    db.users.find({
        email: user.email
        },function(err,users){
        if(err){
            res.send(err);
        }
        
        if(users.length==0){

            db.users.insertOne(user,function(err,users){
                if(err){
                    res.send(err);
                }
                console.log(users)
                res.json({
                    res:"correct",
                    message:"register ok"
                });
            })

        }
        else{
            res.json({
                res:"incorrect",
                message:"user already exists"
            }); 
        }
    })
})

router.delete("/users", async function(req,res,next) {

    var {user} = req.body

  
    db.users.remove({"user" : user}, async function(err,user){
      if(err){
        console.log("Erreur remove")
        res.send(err);
      }

    console.log("user removes")
        res.json({
          res:"correct",
          message:"delete user"
        });
      
    
    })
})

module.exports = router;