const Author = require('../models/Author');

// Display list of all Authors
exports.author_list = async function(req, res) {
    try {
        const promise = await Author.findAll({
            order: [
                ['family_name', 'ASC']
            ]
        });
        res.send(promise);
    } catch(e) {
        console.log(e);
    }  
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
    try {
        const newAuthor = await Author.create({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.dateOfBirth,
            date_of_death: req.body.dateOfDeath
        })
        res.json(newAuthor);
    } catch(e) {
        console.log(e);
    }  
}

// Display Author delete form on GET
exports.author_delete_get = async function(req, res) {
    try {
        const authorObject = await Author.findAll({
            where: {
                author_id: req.params.id
            }
        });
        //console.log('author object in authorController: ' +JSON.stringify(authorObject));
        res.json(authorObject);
    } catch(e) {
        console.log(e);
    }
}

// Handle Author delete on POST
exports.author_delete_post = async function(req, res) {
    try {
        const deletedAuthor = await Author.destroy({
            where: {
                author_id: req.params.id
            }
        });
        res.json(deletedAuthor);
    } catch(e) {
        console.log(e);
    }
}

// Display Author update form on GET
exports.author_update_get = async function(req, res) {
    try {
        const authorData = await Author.findAll({
            where: {
                author_id: req.params.id
            }
        });
        res.json(authorData);
        //res.send('NOT IMPLEMENTED: Author update GET');
    } catch(e) {
        console.log(e);
    }

}

// Handle Author update on POST.
exports.author_update_post = async function(req, res) {
    try {
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
    } catch(e) {
        console.log(e);
    }

}