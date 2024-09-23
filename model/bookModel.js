const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now()
    },
    genre: {
        type: String
    },
    pages: {
        type: Number
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})
const Book = mongoose.model('book', BookSchema)
module.exports = Book