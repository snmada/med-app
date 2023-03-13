const express = require('express');
const router = express.Router();
const db = require("../config/database");

router.get("/get-medical-record-list/:id", (req, res) => {
    db.query(
        "SELECT medical_record_id as id, DATE_FORMAT(date, '%d-%m-%Y') as date FROM medical_record WHERE patient_id = ?", req.params.id,
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

router.post("/add-medical-record", (req, res) => {
    const {diagnosis, symptoms, treatment, remarks} = req.body.formData;
    db.query(
        "INSERT INTO medical_record (patient_id, doctor_id, date, diagnosis, symptoms, treatment, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [
            req.body.id,
            req.session.user.doctor_id,
            req.body.date.split('/').reverse().join('-'),
            diagnosis,
            symptoms,
            treatment,
            remarks
        ],
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result.affectedRows)
                {
                    res.status(200).send('Successfully added!');
                }
            }
        }
    )
});

router.get("/get-medical-record/:id", (req, res) => {
    db.query(
        "SELECT medical_record_id as id, DATE_FORMAT(date, '%d-%m-%Y') as date, diagnosis, symptoms, treatment, remarks FROM medical_record WHERE medical_record_id = ?", req.params.id,
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

router.delete("/delete-medical-record/:id", (req, res) => {
    db.query(
        "DELETE FROM medical_record WHERE medical_record_id = ?", req.params.id,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result.affectedRows)
                {
                    res.status(200).send(result);
                }
            }
        }
    )
});

module.exports = router;