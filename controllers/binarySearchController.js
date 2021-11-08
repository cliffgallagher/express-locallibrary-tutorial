const BinarySearch = require('../binarySearch');
var book_controller = require('./bookController');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

exports.search_for_existing_title = async function(req, res, next) {
    console.log("did end up in search_for_existing_title");
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
    const titleSearchResult = BinarySearch(initialArray, 0, initialArray.length - 1, req.body.title, "title");
    //console.log("titleSearchResult: " + titleSearchResult);

    if (titleSearchResult === -1) {
        //console.log("did end up in if statement");
        next()
    } else {
        //console.log("title already in database");
        res.json("title already present in database");
    }
}

