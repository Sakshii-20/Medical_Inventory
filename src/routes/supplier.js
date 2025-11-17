const express=require('express');
const router=express.Router()
const suppliercontroller=require('../controllers/supplier')
router.get("/supplier/view", suppliercontroller.showsupplier)

router.get("/supplier/add", (req, res) => res.render("supplieradd"));
router.post("/supplier/add",suppliercontroller.addsupplier);
    
router.post("/supplier/delete/:id", suppliercontroller.deletesupplier);

module.exports=router;
