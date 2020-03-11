const Account = require('../models/account.model.js');
require('dotenv').config();

const jwt = require('jsonwebtoken')

const jwtKey = 'W3LC0M3T0M34PP'
const jwtExpirySeconds = 300

// Create and Save a new accounts
exports.create = (req, res) => {
    // Validate request
    if(req.body.username == "" || req.body.password == "") {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }

    // Create a Note
    const account = new Account({
        username: req.body.username, 
        password: req.body.password
    });

    const username = account.username;

    // Save Note in the database
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.DB_URL;

    console.log(process.env.DB_URL);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("WeatherAppDB").collection("Accounts");
    // perform actions on the collection object
    collection.insertOne(account);
    });
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
      })
      console.log('token:', token)
    
      // set the cookie as the token string, with a similar max age as the token
      // here, the max age is in milliseconds, so we multiply by 1000
      res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
      return res.status(200).send({username});
};


// exports.signIn = (req, res) => {
//     // Get credentials from JSON body
//     const { username, password } = req.body
//     if (!username || !password || users[username] !== password) {
//       // return 401 error is username or password doesn't exist, or if password does
//       // not match the password in our records
//       return res.status(401).end()
//     }
  
//     // Create a new token with the username in the payload
//     // and which expires 300 seconds after issue
//     const token = jwt.sign({ username }, jwtKey, {
//       algorithm: 'HS256',
//       expiresIn: jwtExpirySeconds
//     })
//     console.log('token:', token)
  
//     // set the cookie as the token string, with a similar max age as the token
//     // here, the max age is in milliseconds, so we multiply by 1000
//     res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
//     res.end()
//   }




exports.findOne = (req, res) => {
    Account.findById(req.params.accountId)
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with id " + req.params.accountId
        });
    });
};

// Update a note identified by the accountId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }

    // Find note and update it with the request body
    Account.findByIdAndUpdate(req.params.accountId, {
        username: req.body.username,
        password: req.body.password
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Error updating Account with id " + req.params.accountId
        });
    });
};

// Delete a note with the specified accountId in the request
exports.delete = (req, res) => {

};