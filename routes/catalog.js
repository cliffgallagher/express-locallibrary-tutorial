var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
// Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');
var binarySearchController = require('../controllers/binarySearchController');

/// BOOK ROUTES ///

// GET catalog home page.
//router.get('/', book_controller.index);
router.get('/', function(req, res, next) {
    console.log("entered index route");
    next()
}, book_controller.index);

// GET books plus genre and author names
router.get('/enhanced', function(req, res, next) {
    console.log("entered enhanced route");
    next()
}, book_controller.enhanced);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', book_controller.book_create_get);

// POST requests for creating Book.
router.post('/book/create/one', 
body('title').not().isEmpty().withMessage("Title cannot be blank"),
body('isbn').custom((value) => {
    if (value.toLowerCase().search(/\D/) !== -1) {
        throw new Error("ISBN can contain only numbers");
    }
    return true
}),
body('isbn').custom((value) => {
    if ((value.length !== 0) && (value.length !== 10) && (value.length !== 13)) {
        //console.log("entered if block of custom validator");
        throw new Error("ISBN must be 0, 10 or 13 numbers long");
    }
    return true;
}),
body('summary').not().isEmpty().withMessage("Summary cannot be blank"),


function(req, res, next) {
    //console.log("inside book/create/two: " + JSON.stringify(req.body)),
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, binarySearchController.search_for_existing_title, book_controller.book_create_post);


router.post('/book/create/two', 
/*body('title').isLength({min: 1}),
function(req, res, next) {
    //console.log("inside book/create/two: " + JSON.stringify(req.body)),
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
},*/ book_controller.book_create_post);

/*** OLD POST REQUEST FOR CREATING BOOK
router.post('/book/create', function(req, res, next) {
    console.log("request body in /book/create in catalog.js: " + req.body)
    next()
}, book_controller.book_create_post);
***/


// GET request to delete Book.
router.get('/book/:book_id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:book_id/delete', function(req, res, next) {
    console.log("request body in POST /book/delete in catalog.js: " + req.body)
    next()
}, book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:book_id/update', book_controller.book_update_get);

// POST request to update Book.
//router.post('/book/:book_id/update', book_controller.book_update_post);
router.post('/book/:book_id/update/one', binarySearchController.search_for_existing_title, book_controller.book_update_post);
router.post('/book/:book_id/update/two', book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create/one', function(req, res, next) {
    //console.log("request body in author/create: " + JSON.stringify(req.body))
    next()
}, binarySearchController.search_for_existing_author, author_controller.author_create_post);

router.post('/author/create/two', function(req, res, next) {
    //console.log("request body in author/create: " + JSON.stringify(req.body))
    next()
}, author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.

router.get('/author/:id/update', function(req, res, next) {
    console.log('authorID in author_update_get: ' + req.params.id)
    next()
}, author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update/one', binarySearchController.search_for_existing_author, author_controller.author_update_post);
router.post('/author/:id/update/two', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', function(req, res, next) {
    console.log('req body in genre/create: ' + JSON.stringify(req.body))
    next()
}, genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;
