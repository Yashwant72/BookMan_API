const mongoose = require('mongoose')
const User = require('../model/userModel')
const { giveToken } = require('../middleware/auth')
const {checkUserSignUpReq, checkUserLogin} = require("../controller/reqVerify")
const {ValidationError} = require('joi')
const Joi = require('joi')
async function signUpUser(req, res) {
    /*if (!user || !user.username || !user.type || !user.password) {
        return res.status(400).json({error: "Missing Feilds"})
    }*/
    try {
        await checkUserSignUpReq().validateAsync(req.body)
        const user = req.body
        const newUser = await User.create({
            username: user.username,
            type: user.type,
            password: user.password,
        })
        console.log(newUser)
        const token = giveToken(newUser.type)
        return res.status(200).json({msg: "User Created", token: token})
    }
    catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({error: "Invalid request"})
        }
        return res.status(500).json({error: "Failed to create user"})
    }
}
async function loginUser(req, res) {
    /*if (!user || !user.username || !user.password) {
        return res.satus(400).json({error: "Missing Feilds"})
    }*/
    try {
        await checkUserLogin().validateAsync(req.body)
        const user = req.body
        const target = await User.findOne({username: user.username})
        if (target.password == user.password) {
            const token = giveToken(target.type)
            return res.status(200).json({msg: "Logged In", token: token})
        }
        return res.status(400).json({error: "Invalid Creds"})
    }
    catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({error: "Invalid Request"})    
        }
        return res.status(500).json({error: "Failed to login"})
    }
}

module.exports = {
    signUpUser,
    loginUser
}