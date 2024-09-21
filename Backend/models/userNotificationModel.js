const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userNotificationSchema = new Schema({
    NID: {
        type: String,
        required: true
      },
      UserName: {
          type: String,
          required: true
        },
      read_YN: {
        type: Boolean,
        required: true
      },
      
}, { timestamps: true });

module.exports = mongoose.model('User_Notification', userNotificationSchema);
