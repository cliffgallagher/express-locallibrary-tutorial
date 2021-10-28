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
exports.book_delete_get = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Book update GET');
    console.log("book_id in bookController: " + req.params.book_id);
    const bookToDelete = await Book.findAll({
        where: {
          book_id: req.params.book_id
        }
      });
    //console.log(JSON.stringify(bookToUpdate));
    //res.json(bookToUpdate);
    res.send(bookToDelete);
};
// Handle book delete on POST.
exports.book_delete_post = async function(req, res) {
    console.log("book_id in book_delete_post: " + req.params.book_id);
    const deletedBook = await Book.destroy({
        where: {
          book_id: req.params.book_id
        }
      });
    res.send("book deleted");
};

// Display book update form on GET.
exports.book_update_get = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Book update GET');
    //console.log("book_id in bookController: " + req.params.book_id);
    const bookToUpdate = await Book.findAll({
        where: {
          book_id: req.params.book_id
        }
      });
    //console.log(JSON.stringify(bookToUpdate));
    //res.json(bookToUpdate);
    res.send(bookToUpdate);

};

// Handle book update on POST.
exports.book_update_post = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Book update POST');
    console.log("update request in POST handler: " + JSON.stringify(req.body));
    console.log("book_id in POST bookController: " + req.params.book_id);
    const bookToUpdate = await Book.update({ 
        title: req.body.title,
        isbn: req.body.isbn,
        summary: req.body.summary 
    }, {
        where: {
          book_id: req.params.book_id
        }
      });
    //res.json(bookToUpdate);
    res.send(bookToUpdate);
};
