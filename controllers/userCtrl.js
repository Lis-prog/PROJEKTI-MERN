const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const registerController = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email})
        if(existingUser) {
            return res.status(200).send({message: 'Useri Ekizston', success:false})
        }
        const password = req.body.password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message: 'Regjistruat me sukses', success:true});
    } catch(error) {
        console.log(error)
        res.status(500).send({success:false, message: `Register Controller ${error.message}`});
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email})
        if(!user) {
            return res.status(200).send({message:"Useri nuk eshte gjetur", success:false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message:"Invalid Email ose Password", success:false});
        }
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET , 
            {expiresIn: '1d'
        });
        res.status(200).send({message:"Login eshte bere me sukses", success:true, token});
    } catch(error) {
        console.log(error)
        res.status(500).send({success:false, message: `Error ne Login ${error.message}`});
    }
};

const authController = async (req,res) => {
    try {
    const user = await userModel.findById({_id: req.body.userId})
    user.password = undefined;
    if(!user) {
        return res.status(200).send({message: "User nuk u gjet", success: false});
    } else {
        res.status(200).send({
            success:true, 
            data: user,
    });
    }     
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Auth error",
            success:false,
            error
        });
    }
};

const applyDoctorController = async (req, res) => {
    try {
      const newDoctor = await doctorModel({ ...req.body, status: "pending" });
      await newDoctor.save();
      const adminUser = await userModel.findOne({ isAdmin: true });
      const notifcation = adminUser.notification;
      notifcation.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });
      await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
      res.status(201).send({
        success: true,
        message: "Doctor Account Applied SUccessfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Applying For Doctotr",
      });
    }
  };

  const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = [];
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: "all notifaction marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error while gettin notifcation',
            success: false,
            error
        })
    }
  }

//   delete notifications

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Notifications Deleted successfully',
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'unable to delete all notification',
            error
        })
    }
};

const getAllDoctorsController = async (req, res) => {
    try {
      const doctors = await doctorModel.find({ status: 'approved' })
      res.status(200).send({
        success: true,
        message: 'Doctors List Fetched Successfully',
        data: doctors,
      })  
    } catch (error) {
        console.log(error)
        res.status(500).success({
            success: false,
            error,
            message: 'Error While Fethcing Doctor',
        })
    }
}

const bookAppointmentController = async (req,res) => {
    try {
        req.body.status = "pending" 
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({ _Id: req.body.userId})
        user.notification.push({
            type: 'Termin i ri',
            message: `Termin i ri nga ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments',
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Termini u rezervua me sukses",
        });   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Booking Appointment'
        })
    }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController }