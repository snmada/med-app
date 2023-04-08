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

router.get("/get-patient-data/:id", (req, res) => {
    db.query(
        "SELECT lastname as lastName, firstname as firstName, cnp, DATE_FORMAT(date_of_birth, '%d/%m/%Y') as dateOfBirth, age, gender, occupation, street, building_number as buildingNumber, floor, apartment, city, county, phone_number as phoneNumber, email, weight, height, blood_group as bloodGroup, rh_factor as rhFactor, allergies FROM patient WHERE patient_id = ?", req.params.id,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result)
                {
                    res.status(200).send(result);
                }
            }
        }
    )
});

router.post("/add-patient", (req, res) => {
    const {
        firstName, lastName, cnp, dateOfBirth, age, gender, occupation, street, buildingNumber, floor, 
        apartment, city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies
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
                        "INSERT INTO patient (doctor_id, lastname, firstname, cnp, date_of_birth, age, gender, occupation, street, building_number, floor, apartment, city, county, phone_number, email, weight, height, blood_group, rh_factor, allergies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                        [req.session.user.doctor_id, lastName, firstName, cnp, dateOfBirth.split('/').reverse().join('-'), age, gender, occupation, street, buildingNumber, floor, apartment, 
                        city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies ? allergies.join(', ') : ''],
                        (error, result) => {
                            if(error)
                            {
                                res.status(500).send();
                            }
                            else
                            {
                                if(result.affectedRows)
                                {
                                    res.status(200).send('New patient added successfully');
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

router.put("/update-patient/:id", (req, res) => {
    const {
        firstName, lastName, cnp, dateOfBirth, age, gender, occupation, street, buildingNumber, floor, 
        apartment, city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies
    } =  req.body.data;

    const initialCNP = req.body.initialCNP;

    const updatePatientInfo = () => {
        db.query(
            "UPDATE patient set lastname = ?, firstname = ?, cnp = ?, date_of_birth = ?, age = ?, gender = ?, occupation = ?, street = ?, building_number = ?, floor = ?, apartment = ?, city = ?, county = ?, phone_number = ?, email = ?, weight = ?, height = ?, blood_group = ?, rh_factor = ?, allergies = ? WHERE patient_id = ?", 
            [lastName, firstName, cnp, dateOfBirth.split('/').reverse().join('-'), age, gender, occupation, street, buildingNumber, floor, apartment, 
            city, county, phoneNumber, email, weight, height, bloodGroup, rhFactor, allergies.join(', '), req.params.id],
            (error, result) => {
                if(error)
                {
                    res.status(500).send();
                }
                else
                {
                    if(result.affectedRows)
                    {
                        res.status(200).send('Patient data updated successfully');
                    }
                }
            }
        )
    }

    if(initialCNP != cnp)
    {
        db.query(
            "SELECT * FROM patient WHERE cnp = ? and doctor_id = ?", [cnp, req.session.user.doctor_id],
            (error, result) => {
                if(error)
                {
                    res.status(500).send();
                }
                else
                {
                    if(result.length)
                    {
                        res.status(409).send('Patient already exists');
                    }
                    else
                    {
                        updatePatientInfo();
                    }
                }
            }
        )
    }
    else
    {
        updatePatientInfo();
    }
});

module.exports = router;