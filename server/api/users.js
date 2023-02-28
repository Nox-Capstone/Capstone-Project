const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { getUser, createUser } = require("../db/User");
const { requireUserPass } = require("./utils");

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
            const token = jwt.sign({ id: newUser.id, username: newUser.username}, process.env.JWT_SECRET);
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

// POST /api/users/login
router.post('/login', requireUserPass, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await getUser({username, password});
        if(user){
            //Need to test id to make sure we're getting it from getUser function.
            const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET);

            res.send({
                user: {id: user.id, username},
                message: "You're logged in!",
                token
            });
        } else {
            res.send({
                name: "Error",
                message: "Username or password is incorrect"
            });
        }

    } catch (err) {
        throw err;
    }
});

module.exports = router;