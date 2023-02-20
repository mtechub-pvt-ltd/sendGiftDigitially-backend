const express = require("express"),
router=express.Router();

const controller= require("../controllers/giftTypeController");

router.post("/createGiftType",controller.createGiftType)
router.get("/getAllGiftTypes" , controller.getAllGiftTypes);
router.get("/getGiftTypeById",controller.getGiftTypeById);
router.delete("/deleteGiftType",controller.deleteGiftType);
router.put("/updateGiftType",controller.updateGiftType)
router.get("/getGiftTypesByCategory",controller.getGiftTypesByCategory)


module.exports=router