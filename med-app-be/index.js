const express = require('express');
const app = express();
const cors = require('cors');
const session = require("express-session");
require('dotenv').config();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(
    session({
        key: process.env.KEY,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
);

const signup = require("./signup/signup");
app.use("/signup", signup);

const signin = require("./signin/signin");
app.use("/signin", signin);

const signout = require("./signout/signout");
app.use("/signout", signout);

const patient = require("./patient/patient");
app.use("/patient", patient);

app.listen(3001, (error) => {
    if(error)
    {
        console.error("Unable to start the server -> ", error);
    }
    else
    {
        console.log("\x1b[32m%s\x1b[0m", "Server running...");
    }
});