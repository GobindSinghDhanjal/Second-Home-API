const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: String,
    password: String,
    phone: Number,
    email: String,
    address: String,
    homesId: Array
});

module.exports = mongoose.model("Tourist",ownerSchema);