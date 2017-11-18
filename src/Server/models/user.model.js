var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    regdate:String,
    username: String,
    name: String,
    password: String,
    aktiv: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;