const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {
    type: String,
    required: true
  },
 password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: false
  },
  accessLevel: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
