const BinarySearch = require('../binarySearch');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

exports.search_for_existing_title = async function(req, res) {
    //console.log("did end up in search_for_existing_title");
    console.log("req.body in search_for_existing_title: " + JSON.stringify(req.body));
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
    console.log(BinarySearch(initialArray, 0, 6, req.body.title, "title"));
}

