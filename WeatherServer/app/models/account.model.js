const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);