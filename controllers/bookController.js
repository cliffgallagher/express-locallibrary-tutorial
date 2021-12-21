var Book = require('../models/Book');
const { body, validationResult } = require('express-validator');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const db = require("../config/database");

Book.belongsTo(Author, {foreignKey: 'author_id', targetKey: 'author_id'});
Author.hasMany(Book);
Book.belongsTo(Genre, {foreignKey: 'genre_id', targetKey: 'genre_id'});
Genre.hasMany(Book);

exports.index = async function(req, res, next) {
    try {
        const promise = await Book.findAll();
        res.send(promise);
    } catch(e) {
        //console.log(e);
        next(e)
    }
};

// display all books with genre and author names
exports.enhanced = async function(req, res, next) {

    try {
        const response = await Book.findAll({
            attributes: ['book_id', 'title', 'author_id', 'summary', 'isbn', 'genre_id', 'createdAt', 'updatedAt', 'Author.first_name', 'Author.family_name', 'Genre.name'],
            include: [{
                attributes: [],
                model: Author
            }, {
                attributes: [],
                model: Genre
            }],
            raw: 'true',
            order: [
                ['title', 'ASC']
            ]
        });
        res.json(response);  
    } catch(e) {
        //console.log(e);
        next(e)
    }
    
};


// Display list of all books.
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    // Get all authors and genres, which we can use for adding to our book.
};

// Handle book create on POST.
exports.book_create_post = async function(req, res, next) {
    try {
        const [results, metadata] = await db.query("PREPARE stmt1 FROM 'INSERT INTO books (title, author_id, isbn, genre_id, createdAt, updatedAt, summary) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)'")
        const [results2, metadata2] = await db.query(`SET @a = '${req.body.escapedTitle}'`)
        const [results3, metadata3] = await db.query(`SET @b = '${req.body.author_id}'`)
        const [results4, metadata4] = await db.query(`SET @c = '${req.body.isbn}'`)
        const [results5, metadata5] = await db.query(`SET @d = '${req.body.genre_id}'`)
        const [results6, metadata6] = await db.query(`SET @e = '${req.body.summary}'`)
        const [results7, metadata7] = await db.query(`EXECUTE stmt1 USING @a, @b, @c, @d, @e`)
        const [results8, metadata8] = await db.query("DEALLOCATE PREPARE stmt1")
        res.json(results7)
    } catch(e) {
        //console.log(e)
        next(e)
    }
};

// Display book delete form on GET.
exports.book_delete_get = async function(req, res, next) {
    
    try {
        const bookToDelete = await Book.findAll({
            attributes: ['book_id', 'title', 'summary', 'isbn', 'createdAt', 'updatedAt', 'Author.first_name', 'Author.family_name', 'Genre.name'],
            include: [{
                attributes: [],
                model: Author
            }, {
                attributes: [],
                model: Genre
            }],
            raw: 'true',
            where: {
                book_id: req.params.book_id
                }
        });
        res.json(bookToDelete);  
    } catch(e) {
        //console.log(e);
        next(e)
    }
    
};

// Handle book delete on POST.
exports.book_delete_post = async function(req, res, next) {
    try {
        const deletedBook = await Book.destroy({
            where: {
            book_id: req.params.book_id
            }
        });
        res.send("book deleted");
    } catch(e) {
        //console.log(e);
        next(e)
    }
    
};

// Display book update form on GET.
exports.book_update_get = async function(req, res, next) {
    try {
        const bookToUpdate = await Book.findAll({
            attributes: ['book_id', 'title', 'summary', 'isbn', 'createdAt', 'updatedAt', 'Author.first_name', 'Author.family_name', 'Genre.name'],
            include: [{
                attributes: [],
                model: Author
            }, {
                attributes: [],
                model: Genre
            }],
            raw: 'true',
            where: {
                book_id: req.params.book_id
                }
        });
        res.send(bookToUpdate);
    } catch(e) {
        //console.log(e);
        next(e)
    }
    

};

// Handle book update on POST.
exports.book_update_post = async function(req, res, next) {

    try {
        const [results, metadata] = await db.query("PREPARE stmt1 FROM 'UPDATE books SET title=?, author_id=?, isbn=?, genre_id=?, summary=?, updatedAt=? WHERE book_id=?'")
        const [results2, metadata2] = await db.query(`SET @a = '${req.body.title}'`)
        const [results3, metadata3] = await db.query(`SET @b = '${req.body.authorID}'`)
        const [results4, metadata4] = await db.query(`SET @c = '${req.body.isbn}'`)
        const [results5, metadata5] = await db.query(`SET @d = '${req.body.genreID}'`)
        const [results6, metadata6] = await db.query(`SET @e = '${req.body.summary}'`)
        const [results7, metadata7] = await db.query(`SET @f = NOW()`)
        const [results8, metadata8] = await db.query(`SET @g = '${req.params.book_id}'`)
        const [results9, metadata9] = await db.query("EXECUTE stmt1 USING @a, @b, @c, @d, @e, @f, @g")
        const [results10, metadata10] = await db.query("DEALLOCATE PREPARE stmt1")
        res.json(results9);
    } catch(e) {
        //console.log(e);
        next(e)
    }
    //res.send('NOT IMPLEMENTED: Book update POST');
    
};
