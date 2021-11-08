const binarySearch = require('../binarySearch');
var book_controller = require('./bookController');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

exports.search_for_existing_title = async function(req, res, next) {
    //console.log("did end up in search_for_existing_title");
    const initialArray = await Book.findAll({
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
    })
    const titleSearchResult = binarySearch.binarySearchBookObjects(initialArray, 0, initialArray.length - 1, req.body.title, "title");
    //console.log("titleSearchResult: " + titleSearchResult);

    if (titleSearchResult === -1) {
        //console.log("did end up in if statement");
        next()
    } else {
        //console.log("title already in database");
        res.json("title already present in database");
    }
}

exports.search_for_existing_author = async function(req, res, next) {
    //console.log("entered search_for_existing_author");
    const authorArray = await Author.findAll({
        order: [
            ['family_name', 'ASC'],
            ['first_name', 'ASC']
        ]
    });
    //console.log(JSON.stringify(authorArray));
    const result = binarySearch.binarySearchAuthorObjects(authorArray, 0, authorArray.length -1, req.body.family_name, req.body.first_name);
    //console.log("search results: " + result);
    if (result === -1) {
        next()
    } else {
        res.json("author already present in database")
    }
}

