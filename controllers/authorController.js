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
    res.json(newAuthor);
}

// Display Author delete form on GET
exports.author_delete_get = async function(req, res) {
    const authorObject = await Author.findAll({
        where: {
            author_id: req.params.id
        }
    });
    //console.log('author object in authorController: ' +JSON.stringify(authorObject));
    res.json(authorObject);
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
exports.author_update_post = async function(req, res) {
    console.log('req body in author_update_post: ' + JSON.stringify(req.body));
    const authorObject = await Author.update({
        first_name: req.body.firstName,
        family_name: req.body.familyName,
        date_of_birth: req.body.birthDate,
        date_of_death: req.body.deathDate
    }, {
        where: {
            author_id: req.params.id
        }
    })
    res.json(authorObject);
}