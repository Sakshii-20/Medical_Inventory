const express=require('express')
const router=express.Router()
const custcontroller=require('../controllers/customer')

router.get("/customer/add", (req, res) => res.render("customeradd"));

router.get("/customer/view",custcontroller.viewcust )
router.post("/customer/add", custcontroller.addcust)
router.post("/customer/delete/:id", custcontroller.deletecust)
module.exports=router;