// const doctorModel = require("../models/doctorModel");
// const getDoctorInfoController = async (req, res) => {
//   try {
//     const doctor = await doctorModel.findOne({ userId: req.body.userId });
//     res.status(200).send({
//       success: true,
//       message: "Doctor data fetch success",
//       data: doctor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in fetching doctor details",
//     });
//   }
// };

// const updateProfileController = async (req, res) => {
// try {
// const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
// res.status(201).send({
//   success: true,
//   message: 'Doctor Profile Updated',
//   data: doctor,
// })
// } catch (error) {
//   console.log(error)
//   res.status(500).send({
//     success: false,
//     message: 'Doctor Profile Update Issue'
//   })
// }
// }

// module.exports = { getDoctorInfoController, updateProfileController };

const doctorModel = require("../models/doctorModel");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

// get single doki

const getDoctorByIdController = async (req, res) => {
try {
  const doctor = await doctorModel.findOne({ _id: req.body.doctorId});
  res.status(200).send({
    success: true,
    message: 'Single Doki Info Fetched',
    data: doctor,
  })
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    error,
    message: "Error in Single Doki Info"
  })
}
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController };