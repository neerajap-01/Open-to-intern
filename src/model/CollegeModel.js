const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required",
        unique: true,
        trim:true
    },

    fullName: {
        type: String,
        required: "fullName is required",
        trim:true
    },

    logoLink: {
        type: String,
        required: "logoLink is required",
        trim:true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("College", collegeSchema); //colleges