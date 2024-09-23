const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.JWT_SK

function giveToken(type) {
    const payload = {type: type}
    const token = jwt.sign(payload, key, {expiresIn: '1h'})
    return token
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization']
    console.log(token)
    if (!token) {
        
        return res.json({error: "Access denied"})
    }
    try {
        
        const decoded = jwt.verify(token.split("Bearer ")[1], key) //check
        console.log(decoded)
        req.type = decoded.type
        next()
    }
    
    catch (error) {
        return res.json({error: "Token invalid or expired"})
    }
}

module.exports = {
    giveToken,
    verifyToken,
}