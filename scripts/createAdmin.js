require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  try {

    const hashedPassword = await bcrypt.hash(
      "YourStrongPassword123!",
      12
    );

    const admin = new Admin({
      email: "admin@lucky.com",
      password: hashedPassword,
      role: "superadmin"
    });

    await admin.save();

    console.log("Admin created");

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);
  }
}

createAdmin();