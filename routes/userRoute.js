
const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController")
const auth = require("../middlewares/auth")
const upload = require("../middlewares/userImageMulter")

router.post("/register" , upload.single("image"), controller.register)
router.post("/login" , controller.login)
router.post("/checkLogin",auth ,controller.checkLogin)
router.get("/getAllUsers" , controller.getAllUsers)
router.get("/getSpecificUser/:user_id" , controller.getSpecificUser)
router.delete("/deleteUser/:user_id" , controller.deleteUser)
router.put("/updateUser" , controller.updateUser)
router.put("/updatePassword" , controller.updatePassword)
router.put("/updateSubscriptionStatus" , controller.updateSubscribedStatus)
router.put("/updateImage", upload.single("image") , controller.updateImage)






module.exports= router;