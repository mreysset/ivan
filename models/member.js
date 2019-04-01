const mongoose = require('mongoose');
const crypto = require('crypto');
const argon2 = require('argon2');

const MemberSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true, maxlenght: 25},
        last_name: {type: String, required: true, maxlenght: 25},
        email: {type: String, unique: true, required: true, maxlenght: 25},
        username: {type: String, required: true, maxlenght: 50},
        password: {type: String, required: true, mawlenght: 256}
    }
);

//Check if password hashes match
MemberSchema.methods.validPassword = function (password) {
    
    var encodedHash = this.password;
     
    if(argon2.verify(encodedHash, password)) {
        return true;
    } else {
        return false;
    }
}

module.exports = mongoose.model('Member', MemberSchema);