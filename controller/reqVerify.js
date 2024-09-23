const joi = require('joi')


function checkUserSignUpReq() {
    const obj = joi.object({
        username: joi.string().required(),
        type: joi.string().required(),
        password: joi.string().required(),
    })
    return obj
}
function checkUserLogin() {
    const obj = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
    })

    return obj
}

function checkBookReq() {
    const obj = joi.object({
        title: joi.string().required(),
        author: joi.string().required(),
        publishedDate: joi.date(),
        genre: joi.string(),
        pages: joi.number(),
        rating: joi.number().min(1).max(5),
    })
    return obj
}


module.exports = {
    checkUserSignUpReq,
    checkUserLogin,
    checkBookReq,
}