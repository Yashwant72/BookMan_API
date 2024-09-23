const mongoose = require('mongoose')


async function connectToMongoDB(url) {
    if (!url) {
        console.log("No Connection String")
    }
    return mongoose.connect(url)
}

module.exports = {
    connectToMongoDB,
}