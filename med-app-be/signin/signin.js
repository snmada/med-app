const express = require('express');
const router = express.Router();
const db = require("../config/database");
const bcrypt = require('bcrypt');

router.post("/user-sign-in", (req, res) => {
    db.query(
        "SELECT doctor_id, lastname, firstname, password FROM doctor_account WHERE email = ?", req.body.email,
        (error, result) => {
            if(error)
            {
                res.status(500).send();
            }
            else
            {
                if(result.length)
                {
                    bcrypt.compare(req.body.password, result[0].password, (error, response) => {
                        if(response)
                        {
                            const {doctor_id, lastname, firstname} = result[0];
                            req.session.user = {doctor_id, lastname, firstname, loggedIn: true};
                            res.status(200).send();
                        }
                        else
                        {
                            res.status(422).send('You have entered incorrect data');
                        } 
                    })
                }
                else
                {
                    res.status(404).send('User not found');
                }
            }
        }
    )
});

router.get("/user-sign-in", (req, res) => {
    if(req.session.user)
    {
        res.send({lastname: req.session.user.lastname, firstname: req.session.user.firstname});
    }
});

module.exports = router;