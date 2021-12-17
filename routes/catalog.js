var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

// Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');
var binarySearchController = require('../controllers/binarySearchController');
const checkAuth = require('../check-auth');

/// BOOK ROUTES ///

router.use(checkAuth)

// GET catalog home page.
router.get('/', function(req, res, next) {
    //console.log("entered index route");
    next()
}, book_controller.index);

// GET books plus genre and author names
router.get('/enhanced', function(req, res, next) {
    //console.log("entered enhanced route");
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
        throw new Error("ISBN must be 0, 10 or 13 numbers long");
    }
    return true;
}),
body('summary').isLength({
    min: 1,
    max: 250
}).withMessage("Summary must be between 1 and 250 characters."),
body('author_id').not().isEmpty().withMessage("Must pick an author."),
body('genre_id').not().isEmpty().withMessage("Must pick a genre."),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, binarySearchController.search_for_existing_title, book_controller.book_create_post);

router.post('/book/create/two', book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/:book_id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:book_id/delete', book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:book_id/update', book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:book_id/update/one',
body('title').not().isEmpty().withMessage("Title cannot be blank"),
body('isbn').custom((value) => {
    if (value.toLowerCase().search(/\D/) !== -1) {
        throw new Error("ISBN can contain only numbers");
    }
    return true
}),
body('isbn').custom((value) => {
    if ((value.length !== 0) && (value.length !== 10) && (value.length !== 13)) {
        throw new Error("ISBN must be 0, 10 or 13 numbers long");
    }
    return true;
}),
body('summary').isLength({
    min: 1,
    max: 250
}).withMessage("Summary must be between 1 and 250 characters."),
body('authorID').not().isEmpty().withMessage("Must pick an author."),
body('genreID').not().isEmpty().withMessage("Must pick a genre."),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, binarySearchController.search_for_existing_title, book_controller.book_update_post);

router.post('/book/:book_id/update/two',
body('title').not().isEmpty().withMessage("Title cannot be blank"),
body('isbn').custom((value) => {
    if (value.toLowerCase().search(/\D/) !== -1) {
        throw new Error("ISBN can contain only numbers");
    }
    return true
}),
body('isbn').custom((value) => {
    if ((value.length !== 0) && (value.length !== 10) && (value.length !== 13)) {
        throw new Error("ISBN must be 0, 10 or 13 numbers long");
    }
    return true;
}),
body('summary').isLength({
    min: 1,
    max: 250
}).withMessage("Summary must be between 1 and 250 characters."),
body('authorID').not().isEmpty().withMessage("Must pick an author."),
body('genreID').not().isEmpty().withMessage("Must pick a genre."),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create/one', 
body('first_name').not().isEmpty().withMessage('First name cannot be empty'),
body('family_name').not().isEmpty().withMessage('Family name cannot be empty'),
body('dateOfBirth').custom((value) => {
    if (!value) {
        throw new Error ('Date of birth cannot be empty');
    }
    return true;
}),
body('dateOfBirth').custom((value, {req}) => {
    if (req.body.dateOfBirth > new Date().toISOString().slice(0, 10)) {
        throw new Error('Date of birth cannot be a future date')
    }
    return true;
}),
body('dateOfDeath').custom((value, {req}) => {
    if (value) {
        if (req.body.dateOfDeath > new Date().toISOString().slice(0, 10)) {
            throw new Error('Date of death cannot be a future date')
        }
    }
    return true;
}),
body('dateOfDeath').custom((value, {req}) => {
    if (value) {
        if (req.body.dateOfDeath < req.body.dateOfBirth) {
            throw new Error('Date of birth cannot be after date of death');
        }
    }
    return true;
}),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, binarySearchController.search_for_existing_author, author_controller.author_create_post);

router.post('/author/create/two', author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.

router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update/one', binarySearchController.search_for_existing_author, 
body('first_name').not().isEmpty().withMessage('First name cannot be empty'),
body('family_name').not().isEmpty().withMessage('Family name cannot be empty'),
body('birthDate').custom((value, {req}) => {
    if (!value) {
        throw new Error ('Date of birth cannot be empty');
    }
    return true;
}),
body('birthDate').custom((value, {req}) => {
    if (req.body.birthDate > new Date().toISOString().slice(0, 10)) {
        throw new Error('Date of birth cannot be a future date')
    }
    return true;
}),
body('deathDate').custom((value, {req}) => {
    if (value) {
        if (req.body.deathDate > new Date().toISOString().slice(0, 10)) {
            throw new Error('Date of death cannot be a future date')
        }
    }
    return true;
}),
body('deathDate').custom((value, {req}) => {
    if (value) {
        if (req.body.deathDate < req.body.birthDate) {
            throw new Error('Date of birth cannot be after date of death');
        }
    }
    return true;
}),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, author_controller.author_update_post);

router.post('/author/:id/update/two',
body('birthDate').custom((value, {req}) => {
    if (value === "" || !value ) {
        throw new Error ('Date of birth cannot be empty');
    }
    return true;
}),
body('birthDate').custom((value, {req}) => {
    if (req.body.birthDate > new Date().toISOString().slice(0, 10)) {
        throw new Error('Date of birth cannot be a future date')
    }
    return true;
}),
body('deathDate').custom((value, {req}) => {
    if (value) {
        if (req.body.deathDate > new Date().toISOString().slice(0, 10)) {
            throw new Error('Date of death cannot be a future date')
        }
    }
    return true;
}),
body('deathDate').custom((value, {req}) => {
    if (value) {
        if (req.body.deathDate < req.body.birthDate) {
            throw new Error('Date of birth cannot be after date of death');
        }
    }
    return true;
}),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, author_controller.author_update_post);


// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', 
body('genreName').not().isEmpty().withMessage("Genre name cannot be empty"),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', 
body('genreName').not().isEmpty().withMessage("Genre name cannot be empty"),
function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}, genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

module.exports = router;
