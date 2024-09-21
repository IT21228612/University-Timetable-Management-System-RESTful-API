const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  S_Id: {
    type: String,
    required: true
  },
  C_code: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
