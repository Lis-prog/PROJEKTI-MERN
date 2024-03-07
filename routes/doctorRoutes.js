// const express = require("express");

// const router = express.Router();

// const authMiddleware = require("../middlewares/authMiddleware");
// const { getDoctorInfoController, updateProfileController } = require("../controllers/doctorCtrl");

// //  Post single doctor
// router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// // Post Update profile
// router.post("/updateProfile", authMiddleware, updateProfileController)

// module.exports = router;

const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

// POST GET Single Doki Info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController)

module.exports = router;