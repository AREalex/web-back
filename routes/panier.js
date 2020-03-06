var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");


var db = mongojs("mongodb+srv://projet:projet@cluster0-9svap.mongodb.net/Projet?retryWrites=true&w=majority", ["panier"])

router.get("/panier", function (req, res, next) {
    db.panier.find(function (err, panier) {
        if (err) {
            res.send(err);
        }
        res.json(panier);
    })
})

router.get("/panier/:name", function (req, res, next) {
    const name = req.params.name
    db.panier.find({
        _id: name
    }, function (err, panier) {
        if (err) {
            res.send(err);
        }
        res.json(panier);
    })
})

router.post("/panier", function (req, res, next) {
    var panier = req.body

    db.panier.find({
        users: panier.users
    }, function (err, panier) {
        if (err) {
            res.send(err);
        }
        if (panier.length == 0) {

            db.users.insertOne(panier, function (err, panier) {
                if (err) {
                    res.send(err);
                }
                console.log(panier)
                res.json({
                    res: "correct",
                    message: "register ok"
                });
            })

        }
        else {
            db.panier.updateOne(panier, produit, function (err, panier) {
                if (err) {
                    res.send(err);
                }
                console.log(panier)
                res.json({
                    res: "correct",
                    message: "register ok"
                });
            })

        }
    })
})
