const express=require('express');
const router=express.Router();
const salecontroller=require('../controllers/sale')
const authmiddleware=require('../middlewares/auth')

router.get("/sales/create", salecontroller.salecreate)

router.post("/sales/create",authmiddleware.requireAuth,salecontroller.showsale)

router.get("/sales/view", salecontroller.viewsale)
router.post("/sales/delete/:id",salecontroller.deletesale)
// -------------------- Report -------------------- //
router.get("/report", authmiddleware.requireAuth, salecontroller.getreport)

module.exports=router