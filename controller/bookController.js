const Book = require('../model/bookModel')
const Joi = require('joi')
const {checkBookReq} = require('../controller/reqVerify')

async function getAllBooks(req, res) {
    const { page = 1, limit = 10 } = req.body
    try {
        const pageNo = parseInt(page)
        const limitNo = parseInt(limit)
        const books = await Book.find({})
            .limit(limitNo)
            .skip((pageNo - 1) * limitNo)
        
        totalBooks = await Book.countDocuments()
        return res.status(200).json({
            totalBooks,
            currPage: pageNo,
            totalPages: Math.ceil(totalBooks / limitNo),
            books,
        })
    }
    catch (error) {
        return res.status(500).json({error: "Server error"})
    }
}

async function addNewBook(req, res) {
    
    /*console.log(book)
    if (!book || !book.title || !book.author) {
        return res.status(400).json({error: "Missing Feilds"})
    }
    */

    try {
        await checkBookReq().validateAsync(req.body)
        const book = req.body
        if (req.type != "admin") {
            return res.status(400).json({error: "Not Authorized"})
        }
        const newBook = await Book.create({
            title: book.title,
            author: book.author,
            publishedDate: book.publishedDate,
            genre: book.genre,
            pages: book.pages,
            rating: book.rating,
        });
        return res.status(200).json({ msg: "Book Created", id: newBook._id });
    }
    catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({error: "Invalid request"})
        }
        return res.status(500).json({error: "Book Not Created"})
    }
} 

async function getBookByID(req, res) {
    
    const id = req.params.id
    try {
        const book = await Book.findOne({_id: id})
        return res.status(200).json(book)
    }
    catch (error) {
        return res.status(500).json({error: "Not Found"})
    }
}

async function updateBookByID(req, res) {
    const id = req.params.id
    const updates = req.body
    if (req.type != "admin") {
        return res.status(400).json({error: "Not Authorized"})
    }
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {$set: updates})
        if (!updatedBook) {
            return res.status(404).json({error: "Book not found"})
        }
        return res.status(200).json({msg: "Update successful"})
    }
    catch (error) {
        return res.status(500).json({error: "Failed to update"})
    }
}
async function deleteBookByID(req, res) {
    const id = req.params.id
    if (req.type != "admin") {
        return res.status(400).json({error: "Not Authorized"})
    }
    try {
        const result = await Book.deleteOne({_id: id})
        if (result.deletedCount == 0) {
            return res.status(404).json({error: "Book not found"})
        }
        return res.status(200).json({msg: "Book Deleted"})
    }
    catch (error) {
        return res.status(500).json({error: "Failed to delete"})
    }
    
}

module.exports = {
    getAllBooks,
    addNewBook,
    getBookByID,
    updateBookByID,
    deleteBookByID,
}