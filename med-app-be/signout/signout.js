const express = require('express');
const router = express.Router();

router.post("/signout", (req, res) => {
    req.session.destroy((error) => {
        if(error)
        {
            res.status(500).send('Failed to destroy session');
        }
        else
        {
            res.status(200).send();
        }
    })
});

module.exports = router;