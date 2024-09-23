const express = require('express')
const router = express.Router()

const {signUpUser, loginUser} = require('../controller/userController')

router.route('/signUp').post(signUpUser)

router.route('/login').post(loginUser)

module.exports = router