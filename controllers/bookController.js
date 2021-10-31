var Book = require('../models/Book');
const { body, validationResult } = require('express-validator');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const { sequelize } = require('../models/Author');

Book.belongsTo(Author, {foreignKey: 'author_id', targetKey: 'author_id'});
Author.hasMany(Book);
Book.belongsTo(Genre, {foreignKey: 'genre_id', targetKey: 'genre_id'});
Genre.hasMany(Book);

exports.index = async function(req, res) {
    try {
        const promise = await Book.findAll();
        res.send(promise);
    } catch(e) {
        console.log(e);
    }
};

// display all books with genre and author names
exports.enhanced = async function(req, res) {
    //console.log("you are in the enhanced controller method");
    //console.log("Is book a Book? " + (Book === sequelize.models.Book)); // returned "Yes"

    try {
        const response = await Book.findAll({
            attributes: ['book_id', 'title', 'author_id', 'summary', 'isbn', 'createdAt', 'updatedAt', 'Author.first_name', 'Author.family_name', 'Genre.name'],
            include: [{
                attributes: [],
                model: Author
            }, {
                attributes: [],
                model: Genre
            }],
            raw: 'true'
        });
        //console.log(JSON.stringify(response));
        res.json(response);  
    } catch(e) {
        console.log(e);
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
    
    try {
        //res.send('NOT IMPLEMENTED: Book create POST');
        //console.log("req.body in controller: " + req.body);
        const newBook = await Book.create({
        title: req.body.title.titleInput,
        author_id: req.body.author_id.authorInput,
        isbn: req.body.isbn.isbnInput,
        genre_id: req.body.genre_id.genreInput,
        summary: req.body.summary.summaryInput
    });

    res.json(newBook);
    //console.log(JSON.stringify(newBook));
    } catch (e) {
        console.log(e);
    }
    
};

// Display book delete form on GET.
exports.book_delete_get = async function(req, res) {
    
    try {
    //res.send('NOT IMPLEMENTED: Book update GET');
        //console.log("book_id in bookController: " + req.params.book_id);
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
        //console.log(JSON.stringify(bookToUpdate));
        //res.json(bookToUpdate);
        res.send(bookToDelete);  
    } catch(e) {
        console.log(e);
    }
    
};

// Handle book delete on POST.
exports.book_delete_post = async function(req, res) {
    try {
        //console.log("book_id in book_delete_post: " + req.params.book_id);
        const deletedBook = await Book.destroy({
            where: {
            book_id: req.params.book_id
            }
        });
        res.send("book deleted");
    } catch(e) {
        console.log(e);
    }
    
};

// Display book update form on GET.
exports.book_update_get = async function(req, res) {
    try {
        //res.send('NOT IMPLEMENTED: Book update GET');
        //console.log("book_id in bookController: " + req.params.book_id);
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
        //console.log(JSON.stringify(bookToUpdate));
        //res.json(bookToUpdate);
        res.send(bookToUpdate);
    } catch(e) {
        console.log(e);
    }
    

};

// Handle book update on POST.
exports.book_update_post = async function(req, res) {

    try {
        console.log("update request in POST handler: " + JSON.stringify(req.body));
        //console.log("book_id in POST bookController: " + req.params.book_id);
        const bookToUpdate = await Book.update({ 
            title: req.body.title,
            author_id: req.body.authorID,
            isbn: req.body.isbn,
            summary: req.body.summary 
            }, {
            where: {
                book_id: req.params.book_id
            }
        });
        //res.json(bookToUpdate);
        res.send(bookToUpdate);
    } catch(e) {
        console.log(e);
    }
    //res.send('NOT IMPLEMENTED: Book update POST');
    
};
