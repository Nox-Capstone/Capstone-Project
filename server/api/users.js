const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { createUser } = require("../db");

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const newUser = await createUser({username, password});
        if (newUser){
            res.send({
                error: "Error",
                name: "Registration Error",
                message: `User ${username} is already taken.`
            });
        } else if (password.length < 8){
            res.send({
                error: "Error",
                name: "Password Error",
                message: "Password is less than 8 charactors"
            });
        } else {
            const token = jwt.sign({ id: newUser.id, username: newUser.username})
            res.send({
                newUser,
                message: `The username ${username} has been registered successfully`, 
                token
            });
        }

    } catch (err) {
        throw err;
    }
})