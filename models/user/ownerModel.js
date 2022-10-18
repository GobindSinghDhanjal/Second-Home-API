const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const ownerSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    phone: Number,
    email: String,
    address: String,
    homesId: Array
});

ownerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("OwnerDetails",ownerSchema);