const express = require('express');
const { loginController, registerController, authController, applyDoctorController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//Router onject
const router = express.Router()

//routes
// login || post
router.post('/login', loginController)

//register || post
router.post('/register', registerController)


//Auth || POST
router.post('/getUserData', authMiddleware, authController);

router.post('/apply-doctor', authMiddleware, applyDoctorController);

module.exports = router