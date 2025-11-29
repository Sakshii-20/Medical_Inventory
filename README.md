# Medical Inventory Management System

A simple Medical Inventory Management System built with Node.js, Express, MongoDB, and EJS.  
This project allows you to manage medicines, customers, sales, and suppliers with user authentication.

1) Features

-User authentication (Signup, Login, Logout)
- Role-based access
- Manage Medicines (Add, View)
- Manage Customers (Add, View)
- Manage Suppliers (Add, View)
- Sales management
- Dashboard view


2) Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating Engine:** EJS
- **Authentication:** JWT, bcrypt
- **Other Packages:** dotenv, cookie-parser



1️⃣ Clone the repository
  ```bash
   git clone <repository-url>
   cd medical-inventory
  ```


2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Create a .env file
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/medical_inventory
JWT_SECRET=yourSecretKey
```

4️⃣Run the project
```
npm start
```
5️⃣Open in Browser
```
http://localhost:3000
```



