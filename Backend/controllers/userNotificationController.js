const Enrollment = require('../models/enrollmentModel'); // Import the Enrollment model
const UserNotification = require('../models/userNotificationModel'); // Import the UserNotification model
const Notification = require('../models/notificationModel'); // Import the Notification model


const assignNotificationsToUsers = async (newNotification) => {
    try {

        
      // Step 1: Check the newNotification's C_name against the enrollments collection's C_name
      const matchingEnrollments = await Enrollment.find({ C_code: newNotification.C_name });
    
      // Add this line for debugging
      //console.log('Matching Enrollments:', matchingEnrollments); 

      // Step 2: Save the userNames of the matching entries into a list
      const userNames = matchingEnrollments.map(enrollment => enrollment.S_Id);
      
      // Add this line for debugging
      //console.log('User Names:', userNames); 
      
  
      // Step 3: For each username in that list, create and save userNotification documents into the db
      for (const userName of userNames) {
        await UserNotification.create({
          NID: newNotification._id,
          UserName: userName,
          read_YN: false
        });

        
      }
    } catch (error) {
      console.error('Error in assigning notifications to users:', error);
    }
  };

  const getUserNotifications = async (req) => {
    try {
        // Step 1: Extract the user name from req.user
        const userName = req.user.UserName;

        // Step 2: Search the User_Notification collection for notifications matching the username
        const userNotifications = await UserNotification.find({ UserName: userName });

        // Step 3: Save the number of unread notifications in a variable and save the unread notifications IDs in a list
        let unreadNotificationsCount = 0;
        const unreadNotificationsIDs = [];
        userNotifications.forEach(notification => {
            if (!notification.read_YN) {
                unreadNotificationsCount++;
                unreadNotificationsIDs.push(notification.NID);
            }
        });

        // Step 4: Get the NIDs from the matched User_Notification documents and search them against the notification collection
        const matchingNotifications = await Notification.find({ _id: { $in: unreadNotificationsIDs } });

        return { unreadNotificationsCount, matchingNotifications };
    } catch (error) {
        console.error('Error in getting user notifications:', error);
        throw error; // Propagate the error to the caller
    }
};

// Function to update user notification read status
const updateUserNotificationReadStatus = async (req) => {
  try {
      // Extract the user notification ID from the request parameters
      const notificationId = req.params.id;

      // Extract the read status from the request body
      const { read_YN } = req.body;

      // Check if the read_YN value is provided
      if (read_YN === undefined || read_YN === null) {
          throw new Error('Read status is required');
      }

      // Find the user notification by ID and update its read status
      const userNotification = await UserNotification.findByIdAndUpdate(notificationId, { read_YN }, { new: true });

      // Check if the user notification is found and updated
      if (!userNotification) {
          return { success: false, message: 'User notification not found' };
      }

      return { success: true, message: 'User notification read status updated successfully' };
  } catch (error) {
      console.error('Error in updating user notification read status:', error);
      throw error; // Propagate the error to the caller
  }
};





  

  module.exports = {
    assignNotificationsToUsers,
    getUserNotifications,
    updateUserNotificationReadStatus,
    
  };
  

