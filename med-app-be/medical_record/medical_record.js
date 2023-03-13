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

module.exports = router;