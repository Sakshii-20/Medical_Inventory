const Supplier=require('../models/Supplier')

async function showsupplier(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.render("suppliershow", { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching suppliers");
  }
}

 async  function addsupplier(req, res) {
  try {
    await Supplier.create({
      supplierId: `SUP-${Date.now()}`,
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      address: req.body.address
    });
    res.redirect("/supplier/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding supplier");
  }
};
async function deletesupplier(req, res){
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/supplier/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Failed to delete supplier");
  }
};


module.exports={
    showsupplier,addsupplier,deletesupplier
}