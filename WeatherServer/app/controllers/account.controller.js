const Account = require('../models/account.model.js');

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

    // Save Note in the database
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://root:Pokemon20@cluster0-kxbji.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("WeatherAppDB").collection("Accounts");
    // perform actions on the collection object
    collection.insertOne(account);
    });

    return res.status(200).send({message: "account created"});
};

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    Account.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving accounts."
        });
    });
};

// Find a single note with a noteId
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