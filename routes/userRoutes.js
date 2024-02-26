const express = require('express');

//Router onject
const router = express.Router()

const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');



//routes
// login || post
router.post('/login', loginController)

//register || post
router.post('/register', registerController)


//Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Apply doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification doctor
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// Delete Notification
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

module.exports = router