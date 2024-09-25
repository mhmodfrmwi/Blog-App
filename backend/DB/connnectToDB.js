const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to db");
  } catch (error) {
    console.log("error " + error);
  }
};
module.exports = connectToDB;
