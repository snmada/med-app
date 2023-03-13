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

router.post("/add-patient", (req, res) => {
    const {
        firstName, lastName, cnp, dateOfBirth, age, gender, occupation, street, building_number, floor, 
        appartment, city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies
    } =  req.body.formData;

    db.query(
        "SELECT * FROM patient WHERE cnp = ?", cnp,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(!result.length)
                {
                    db.query(
                        "INSERT INTO patient (doctor_id, lastname, firstname, cnp, date_of_birth, age, gender, occupation, street, building_number, floor, appartment, city, county, phone_number, email, weight, height, blood_group, rh_factor, allergies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                        [req.session.user.doctor_id, lastName, firstName, cnp, dateOfBirth.split('/').reverse().join('-'), age, gender, occupation, street, building_number, floor, appartment, 
                        city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies.join(', ')],
                        (error, result) => {
                            if(error)
                            {
                                res.status(500).send();
                            }
                            else
                            {
                                if(result.affectedRows)
                                {
                                    res.status(200).send('New patient added successfully!');
                                }
                            }
                        }
                    )
                }
                else
                {
                    res.status(409).send('Patient already exists');
                }
            }
        }
    )
});

module.exports = router;