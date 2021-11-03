const Author = require('../models/Author');

// Display list of all Authors
exports.author_list = async function(req, res) {
    const promise = await Author.findAll({
        order: [
            ['family_name', 'ASC']
        ]
    });
    res.send(promise);
}

// Display detail page for a specific Author
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
}

// Display  Author create form on GET
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
}

// Handle Author create on POST
exports.author_create_post = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Author create POST');
    const newAuthor = await Author.create({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.dateOfBirth,
        date_of_death: req.body.dateOfDeath
    })
    res.send('new author created');
}

// Display Author delete form on GET
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
}

// Handle Author delete on POST
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
}

// Display Author update form on GET
exports.author_update_get = async function(req, res) {
    const authorData = await Author.findAll({
        where: {
            author_id: req.params.id
        }
    });
    res.json(authorData);
    //res.send('NOT IMPLEMENTED: Author update GET');
}

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
}