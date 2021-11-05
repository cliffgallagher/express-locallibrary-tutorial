var Genre = require('../models/Genre');

// Display list of all Genre.
exports.genre_list = async function(req, res) {
    console.log('entered correct controller');
    const promise = await Genre.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    res.send(promise);
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = async function(req, res) {
    const newGenre = await Genre.create({
        name: req.body.genreName
    })
    
    res.send(newGenre);
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = async function(req, res) {
    try {
        const genreObject = await Genre.findAll({
            where: {
                genre_id: req.params.id
            }
        })
        //console.log('genreObject in controller: ' + JSON.stringify(genreObject));
        res.json(genreObject);
    } catch(e) {
        console.log(e);
    }
};

// Handle Genre update on POST.
exports.genre_update_post = async function(req, res) {
    try {
        const updatedGenre = await Genre.update({
          name: req.body.genreName  
        }, {
            where: {
                genre_id: req.params.id
            }
        })
        res.json(updatedGenre);
    } catch(e) {
        console.log(e);
    }
};
