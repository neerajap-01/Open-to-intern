const collegeModel = require("../model/CollegeModel");
const Interns = require('../model/internsModel');
const { validString, validUrl } = require("../utils/validation")

const createCollege = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data" })

        if (!data.name) return res.status(400).send({ status: false, message: "name is Required" })
        if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is Required" })
        if (!data.logoLink) return res.status(400).send({ status: false, message: "logoLink is Required" })

        if (validString.test(data.name)) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (validString.test(data.fullName)) return res.status(400).send({ status: false, message: "please provide valid fullName" })
        if (!validUrl.test(data.logoLink)) return res.status(400).send({ status: false, message: "please provide valid logoLink" })


        let nameCheck = await collegeModel.findOne({ name: data.name })

        if (nameCheck) return res.status(401).send({ status: false, message: "name is already used" })

        let saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: "college Created Successfully", data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const collegeDetails = async (req, res) => {
    try {
        let collegeName = req.query.collegeName;
        if (!collegeName) return res.status(400).send({ status: false, message: "Enter College Name" });
        if (validString.test(collegeName)) return res.status(400).send({ status: false, message: "Enter a valid college name" })

        let getCollegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1 });
        if (!getCollegeData) return res.status(404).send({ status: false, message: "College not found! check the name and try again" });

        let data = getCollegeData._doc

        let getInterns = await Interns.find({ collegeId: data._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });
        if (!getInterns) return res.status(404).send({ status: false, message: "No interns available" });

        delete (data._id);
        data.interests = getInterns;

        res.status(200).send({ status: true, message: "All okk", data: data });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createCollege, collegeDetails }
