const binarySearch = require('../binarySearch');
var book_controller = require('./bookController');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

exports.search_for_existing_title = async function(req, res, next) {
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

    if (titleSearchResult === -1) {
        next()
    } else {
        res.json({
            "errors": [
              {
                'msg': 'title already in database'
              }
            ]
          });
    }
}

exports.search_for_existing_author = async function(req, res, next) {
    const authorArray = await Author.findAll({
        order: [
            ['family_name', 'ASC'],
            ['first_name', 'ASC']
        ]
    });

    const result = binarySearch.binarySearchAuthorObjects(authorArray, 0, authorArray.length -1, req.body.family_name, req.body.first_name)
    if (result === -1) {
        next()
    } else {
        res.json({
            "errors": [
              {
                'msg': 'author already in database'
              }
            ]
          })
    }
}

