var Book = require('../models/Book');
const { body, validationResult } = require('express-validator');
const Author = require('../models/Author');

exports.index = async function(req, res) {
    const promise = await Book.findAll();
    res.send(promise);
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
    /*async.parallel({
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    });*/
};

// Handle book create on POST.
exports.book_create_post = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Book create POST');
    console.log("req.body in controller: " + req.body);
    const newBook = await Book.create({
        title: req.body.title.titleInput,
        author_id: req.body.author_id.authorInput,
        isbn: req.body.isbn.isbnInput,
        genre_id: req.body.genre_id.genreInput,
        summary: req.body.summary.summaryInput
    });

    res.json(newBook);
    //console.log(JSON.stringify(newBook));
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
    console.log("you made it");
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
