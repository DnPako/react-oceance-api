const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const JWT =  require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

const getUserByEmail = (p_user) => {
    return mongoose.model('User').findOne({email: p_user.email}).exec();
};

const addUser = async (p_user, res, next) => {
    try {
        const user = await getUserByEmail(p_user);
        if (user) {
            return next(new Error("User already exists"));
        }
        return p_user.save();
    } catch (error) {
        return next(error);
    }
};

const sendToken = (p_user, res) => {
    const token = JWT.sign({email: p_user.email}, JWT_SECRET, {expiresIn: '24h'});

    res.status(200).json({token}).end();
};

const registerUserAndSendToken = async (p_user, res, next) => {
    try {
        const addedUser = await addUser(p_user, res, next);
        sendToken(addedUser, res)
    } catch (error) {
        return next(error);
    }
};

// register
router.post('/register', (req, res, next) => {
    const {email, password} = req.body;
    const user = new User({email, password});

    bcrypt.genSalt(10, (error, salt) => {
        return bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;

            registerUserAndSendToken(user, res, next);
        });
    });
});

// login
router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    const user = new User({email, password});

    const dbuser = await getUserByEmail(user);
    if (!dbuser) {
        return next(new Error("Email is not yet registered!"));
    }

    bcrypt.compare(user.password, dbuser.password, (error, isMatch) => {
        if (error) {
            return next(error);
        }

        if (!isMatch) {
            return next(new Error("Password does not match! Please try again."));
        }

        sendToken(dbuser, res)
    });
});

module.exports = router;