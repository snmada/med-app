const express = require('express');
const router = express.Router();
const db = require("../config/database");
const bcrypt = require('bcrypt');

router.post("/email", (req, res) => {
    db.query(
        "SELECT * FROM doctor_account WHERE email = ?", req.body.email,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                result.length? res.status(409).send('Account already exists') : res.status(200).send();
            }
        }
    )
});

router.post("/uid", (req, res) => {
    db.query(
        "SELECT * FROM doctor WHERE doctor_id = ?", req.body.uid,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result.length)
                (
                    db.query(
                        "SELECT * FROM doctor_account WHERE doctor_id = ?", req.body.uid,
                        (error, result) => {
                            if(error)
                            {
                                res.status(500).send();
                            }
                            else
                            {
                                !result.length? res.status(200).send() : res.status(409).send('Account already exists');
                            }
                        }
                    )
                )
                else
                {
                    res.status(404).send('UID not found');
                }
            }
        }
    )
});

router.post('/user-sign-up', (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if(error)
        {
            res.status(500).send();
        }
        else 
        {
            db.query(
                "INSERT INTO doctor_account (doctor_id, lastname, firstname, email, password) VALUES (?, ?, ?, ?, ?)",
                [req.body.uid, req.body.lastName, req.body.firstName, req.body.email, hash],
                (error, result) => {
                    if(error)
                    {
                        res.status(500).send();
                    }
                    else
                    {
                        if(result.affectedRows)
                        {
                            const [doctor_id, lastname, firstname] = [req.body.uid, req.body.lastName, req.body.firstName];
                            req.session.user = {doctor_id, lastname, firstname, loggedIn: true};
                            res.status(200).send();
                        }
                    }
                }
            )
        }
    })
});

module.exports = router;