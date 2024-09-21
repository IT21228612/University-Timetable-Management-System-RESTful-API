const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    C_name: {
      type: String,
      required: true
    },
    day: {
        type: String,
        required: true
      },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
        type: Date,
        required: true
      },
    faculty: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
   
  }, { timestamps: true });
  
  module.exports = mongoose.model('Timetable', courseSchema);
  