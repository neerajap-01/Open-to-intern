const express = require('express');
const { addInterns } = require('../controllers/internsController');
const { createCollege, collegeDetails } = require("../controllers/collegeController")

const router = express.Router();

router.post("/functionup/colleges", createCollege)
router.post('/functionup/interns', addInterns);
router.get('/functionup/collegeDetails', collegeDetails);

module.exports = router;