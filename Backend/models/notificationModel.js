const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    C_name: {
        type: String,
        required: true
      },
      day: {
          type: String,
          required: false
        },
      startTime: {
        type: Date,
        required: false
      },
      endTime: {
          type: Date,
          required: false
        },
      faculty: {
        type: String,
        required: false
      },
      location: {
        type: String,
        required: false
      },
      
      changes: {
        type: String,
        required: true
      },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
