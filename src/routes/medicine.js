const express=require('express');
const router=express.Router()
const medicineRoute=require('../controllers/medicine')

router.get("/medicine/view",medicineRoute.showmedicine)

router.get("/medicine/add",medicineRoute.getaddedmedicine)

router.post("/medicine/add",medicineRoute.addmedicine)
router.post("/medicine/delete/:id", medicineRoute.deletemedicine);
module.exports=router;