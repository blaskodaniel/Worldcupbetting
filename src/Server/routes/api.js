var express = require("express");
var chalk        = require("chalk");
var jwt    = require('jsonwebtoken');

var APIroute = function(User,users,app){
    var apiRouter = express.Router();
    apiRouter.use(function(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
                  if (err) {
                    console.log(chalk.red(req.connection.remoteAddress+": Failed to authenticate token."));
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                  } else {
                    // if everything is good, save to request for use in other routes
                    console.log(chalk.green(req.connection.remoteAddress+": Valid JWT token"));
                    req.decoded = decoded;    
                    next();
                  }
            });
            
        } else {
            // if there is no token
            // return an error
            if(req.originalUrl.indexOf("login") > 0){
                next();
            }else{
                console.log(chalk.red(req.connection.remoteAddress+": No JWT token"));
                return res.status(403).send({ 
                    success: false, 
                    message: 'No token provided.' 
                });
                
            }
            
        }
    });
    
    // GET http://localhost:8080/api
    apiRouter.route('/').get(function(req, res) {
        res.json({ message: 'hooray! welcome to our api! http://localhost:8080/api' });   
    });
    
    // AUTHENTICATION:
    apiRouter.route('/login').post(function(req,res){
            var isSuccessLogin = false;
            users.forEach((user)=>{
                if(user.name === req.body.username && user.password === req.body.password){
                    isSuccessLogin = true;
                    console.log(chalk.green(req.connection.remoteAddress+": Suceessfuly JWT authentication."));
                    const payload = {
                        user: req.body.username
                    };
                    var token = jwt.sign(payload, app.get('superSecret'));
                    res.json({
                        success: true,
                        message: 'JWT authentication is succesfully!',
                        token: token
                    });
                }
            });
            if(!isSuccessLogin){
                console.log(chalk.red(req.connection.remoteAddress+": Faild JWT authentication."));
                res.json({ message: 'JWT authentication faild!' }); 
            }
    });
    
    apiRouter.route('/register').post(function(req, res) {
        console.log("Regisztráció:",req.body);
        var newuser = new User(req.body);
        newuser.save();
        res.status(201).send(newuser);
    });
    
    apiRouter.route('/getusers').get(function(req, res) {
        console.log("GetUsers:",req.query);
        var query = req.query;
        User.find(query, function(err, users) {
            if (err) {res.status(500).send(err);;}
            else{
                res.json(users);
            }
            
        });
         
    });

    return apiRouter;
}

module.exports = APIroute;
