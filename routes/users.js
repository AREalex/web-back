var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('./models');
const config = require('./config');


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
    var {user, password} = req.body

    db.users.find({
        email: user.email,
        password: user.password
    },function(err,users){
        if(err){
            res.send(err);
        }
         /* 2. On envoie une erreur au client si le paramètre username est manquant */
    if (!username) {
        return res.status(400).json({ message: 'missing_required_parameter', info: 'username' });
      }
      /* 3. On envoie une erreur au client si le paramètre password est manquant */
      if (!password) {
        return res.status(400).json({ message: 'missing_required_parameter', info: 'password' });
      }
   
      /* 4. On authentifie l'utilisateur */
      const user = await User.authenticate(username, password);
   
      /* 5. On envoie une erreur au client si les informations de connexion sont erronées */
      if (!user) {
        return res.status(401).json({
          message: 'Username or password is incorrect'
        });
      }
   
      /* 6. On créer le JWT */
      const accessToken = await jwt.sign(
        { firstName: user.firstName, lastName: user.lastName },
        config.accessToken.secret,
        {
          algorithm: config.accessToken.algorithm,
          audience: config.accessToken.audience,
          expiresIn: config.accessToken.expiresIn / 1000,
          issuer: config.accessToken.issuer,
          subject: user.id.toString()
        }
      );
   
      /* 7. On créer le refresh token et on le stocke en BDD */
      const refreshToken = crypto.randomBytes(128).toString('base64');
   
      await RefreshToken.create({
        userId: user.id,
        token: refreshToken,
        expiresAt: Date.now() + config.refreshToken.expiresIn
      });
   
      /* 7. On envoie au client le JWT et le refresh token */
      return res.json({
        accessToken,
        tokenType: config.accessToken.type,
        accessTokenExpiresIn: config.accessToken.expiresIn,
        refreshToken,
        refreshTokenExpiresIn: config.refreshToken.expiresIn
      });
    } /*
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
        } */
    )
})

module.exports = router;