const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const doctorModel = require('../models/doctorModel')

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
        res.status(200).send({success:true, 
            data: user
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

// const applyDoctorController = async (req, res) => {
//     try {
//         const newDoctor = await doctorModel({...req.body, status:'pending'});
//         await newDoctor.save()
//         const adminUser = await userModel.findOne({isAdmin:true});
//         const notifciation = adminUser.notifciation
//         notifciation.push({
//             type: 'apply-doctor-request',
//             message: `${newDoctor.firstName} ${newDoctor.lastName} Ka aplikuar per Doktor`,
//             data: {
//                 doctorId: newDoctor._id,
//                 name: newDoctor.firstName + " " + newDoctor.lastName,
//                 onClickPath: '/admin/doctors'
//             }
//         })
//         await userModel.findByIdAndUpdate(adminUser._id,{notifciation})
//         res.status(201).send({
//             success: true,
//             message:'Accounti i doktor ka aplikuar me sukses '
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             error,
//             message: 'Error derisa keni aplikuar per Doktor'
//         })
//     }
// }
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
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController }