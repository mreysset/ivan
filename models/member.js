const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true, maxlenght: 25},
        last_name: {type: String, required: true, maxlenght: 25},
        email: {type: String, unique: true, required: true, maxlenght: 25},
        username: {type: String, required: true, maxlenght: 50},
        password: {type: String, required: true, mawlenght: 256}
    }
);


MemberSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true; 
  } else {
    return false;
  }
}

module.exports = mongoose.model('Member', MemberSchema);