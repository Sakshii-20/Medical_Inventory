const Supplier=require('../models/Supplier')
const Medicine=require('../models/Medicine')
async function showmedicine(req, res){
  try {
    const medicines = await Medicine.find().populate("supplierId"); 
    res.render("medicineshow", { medicines }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Failed to fetch medicines");
  }
};

 async function getaddedmedicine(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.render("medicineadd", { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Failed to load form");
  }
};

 async function  addmedicine(req, res) {
  try {
    const { name, batchNo, manufacturer, expiryDate, quantity, price, supplierId } = req.body;
    const newMedicine = new Medicine({
      medicineId: `MED-${Date.now()}`,
      name, batchNo, manufacturer, expiryDate, quantity, price, supplierId
    });
    await newMedicine.save();
    res.redirect("/medicine/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding medicine");
  }
};

async function deletemedicine(req, res){
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.redirect("/medicine/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Failed to delete medicine");
  }
};

module.exports={showmedicine,getaddedmedicine,addmedicine,deletemedicine}