const Customer=require('../models/Customer');
async function viewcust (req, res) {
  try {
    const customers = await Customer.find();
    res.render("customershow", { customers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading customers");
  }
}


async function addcust (req, res) {
  try {
    const { name, contact, email, address } = req.body;
    const newCustomer = new Customer({
      customerId: `CUST-${Date.now()}`,
      name, contact, email, address
    });
    await newCustomer.save();
    res.redirect("/customer/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding customer");
  }
};

async function deletecust(req,res) {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.redirect("/customer/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Failed to delete customer");
  }
};
module.exports={viewcust,addcust,deletecust}
