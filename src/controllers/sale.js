
const Medicine=require('../models/Medicine');
const Customer=require('../models/Customer');
const Supplier=require('../models/Supplier')

const Sales=require('../models/Sales');
async function salecreate(req, res) {
  try {
    const medicines = await Medicine.find();
    const customers = await Customer.find();
    res.render("salescreate", { medicines, customers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading sale create page");
  }
};
async function showsale (req, res){
  try {
    const { medicineId, customerId, quantitySold } = req.body;
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(400).send("Medicine not found");

    const totalPrice = medicine.price * quantitySold;

    await Sales.create({
      saleId: `SALE-${Date.now()}`,
      medicineId,
      customerId,
      userId: req.user._id, // ✅ fixed
      quantitySold,
      totalPrice
    });

    res.redirect("/sales/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating sale");
  }
};
async function viewsale(req, res) {
  try {
    const sales = await Sales.find()
      .populate("medicineId")
      .populate("customerId")
      .populate("userId");
    res.render("salesshow", { sales });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading sales");
  }
};

async function deletesale(req, res)  {
  try {
    await Sales.findByIdAndDelete(req.params.id);
    res.redirect("/sales/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting sale");
  }
};
async function getreport (req, res){
  try {
    const medicines = await Medicine.find();
    const suppliers = await Supplier.find();
    const customers = await Customer.find();
    const sales = await Sales.find()
      .populate("medicineId")
      .populate("customerId")
      .populate("userId");

    const report = {
      totalMedicines: medicines.length,
      totalSuppliers: suppliers.length,
      totalCustomers: customers.length,
      totalSales: sales.length
    };

    res.render("report", { report, medicines, suppliers, customers, sales, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ Error generating report");
  }
};

module.exports={salecreate,showsale,viewsale,deletesale,getreport}