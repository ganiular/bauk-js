const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config.js");

mongoose.connect(MONGODB_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Error connecting to Database:", err));

module.exports = mongoose;
