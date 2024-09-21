const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  C_name: {
    type: String,
    required: true
  },
  C_code: {
    type: String,
    required: true
  },
  C_description: {
    type: String,
    required: true
  },
  C_credits: {
    type: Number,
    required: true
  },
  C_faculty: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
