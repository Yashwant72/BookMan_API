const express = require('express')
const {getAllBooks, addNewBook, getBookByID, updateBookByID, deleteBookByID} = require('../controller/bookController')
const router = express.Router()
const {verifyToken} = require('../middleware/auth')
router
.route('/book')
.get(getAllBooks)
.post(verifyToken, addNewBook)

router.route('/book/:id')
.get(getBookByID)
.put(verifyToken, updateBookByID)
.delete(verifyToken, deleteBookByID)

module.exports = router