const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
let key = 'Fantastic';

exports.createUser = async (req, res) => {
    try {
        const { fullname, email, dob, role, password, cpassword } = req.body

        if (password == cpassword) {

            bcrypt.hash(password, 5, async (err, s_password) => {
                if (err) {
                    return console.log(err);
                } else {
                    const newUser = await User.create({ fullname, email, dob, role, password: s_password, cpassword: s_password });

                    res.status(200).json({
                        status: "success",
                        data: {
                            newUser
                        }
                    })

                }
            })

        } else {
            res.status(404).json({
                status: "fail",
                message: "Password does not match!"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let getUser = await User.find({ email });

        // console.log(getUser)
        if (getUser.length > 0) {
            let userDetails = getUser[0]
            bcrypt.compare(password, getUser[0].password, (err, result) => {
                if (result) {
                    jwt.sign({ userDetails }, key, { expiresIn: '1h' }, (err, token) => {
                        res.status(200).json({
                            status: "success",
                            message: "login Successful",
                            token
                        })
                    })
                } else {
                    res.send("Wrong Crenditials")
                }
            })

        } else {
            res.status(404).json({
                status: "fail",
                message: "Give Correct Input!"
            })
        }

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.profile = async (req, res) => {
    try {
        jwt.verify(req.token, key, (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid token"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Profile found",
                    data
                })
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        return res.status(400).json({
            status: "fail",
            message: "Token is not valid"
        })
    }
}