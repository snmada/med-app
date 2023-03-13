const express = require('express');
const router = express.Router();
const db = require("../config/database");

router.get("/get-patient-list", (req, res) => {
    db.query(
        "SELECT patient_id as id, lastname, firstname, cnp, DATE_FORMAT(date_of_birth, '%d-%m-%Y') as date_of_birth, age, county, city FROM patient WHERE doctor_id = ?", req.session.user.doctor_id,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result.length)
                {
                    res.status(200).send(result);
                }
            }
        }
    )
});

module.exports = router;