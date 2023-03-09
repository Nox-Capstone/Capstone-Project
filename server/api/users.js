const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const { createUser, getUserByUsername, getAllUsers } = require("../db/User");
const { requireUserPass } = require("./utils");

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const _user = await getUserByUsername(username);

        if (_user){
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
            const newUser = await createUser({username, password});
            const token = jwt.sign({ id: newUser.id, username}, process.env.JWT_SECRET);
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
        const user = await getUserByUsername(username);
        console.log(user)
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            res.send({
                name: "PasswordMismatch",
                message: "Username or Password does not match"
            })
        }
        else{
            //Need to test id to make sure we're getting it from getUser function.
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({
                message: "you're logged in!",
                token,
                user
            });
        } 

    } catch (error) {
        next(error);
    }
});

router.get('/me', async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            res.status(401).send({
                error: 'NoToken',
                message: "You must be logged in to perform this action",
                name: 'NoTokenFound'
            })
        }
        else {const newToken = token.slice(7)
        const verifiedToken = jwt.verify(newToken, process.env.JWT_SECRET);
        const user = await getUserByUsername(verifiedToken.username)
        res.send(user)
    }
    } catch (error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        if(users){
            res.send(users)
        } else {
            next({
                name:'getUsersError',
                message: 'Failed to retrieve all users'
            });
        };
    } catch (err) {
        next(err);
    }
});



module.exports = router;