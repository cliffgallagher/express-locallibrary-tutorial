var Genre = require('../models/Genre');
const db = require("../config/database");

// Display list of all Genre.
exports.genre_list = async function(req, res) {
    //console.log('entered correct controller');
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
exports.genre_create_post = async function(req, res, next) {
    try {
        /*const newGenre = await Genre.create({
            name: req.body.genreName
        })
        
        res.send(newGenre)*/
        console.log('req.body in genre_create_post: ' + JSON.stringify(req.body))
        const [results, metadata] = await db.query("PREPARE stmt1 FROM 'INSERT INTO genres (name, createdAt, updatedAt) VALUES (?, NOW(), NOW())'")
        const [results2, metadata2] = await db.query(`SET @a = '${req.body.genreName}'`)
        const [results3, metadata3] = await db.query("EXECUTE stmt1 USING @a")
        const [results4, metadata4] = await db.query("DEALLOCATE PREPARE stmt1")
        res.json(results3)
    } catch(e) {
        next(e)
    }
};

// Display Genre delete form on GET.
exports.genre_delete_get = async function(req, res) {
    try {
        const genreToDelete = await Genre.findAll({
            where: {
                genre_id: req.params.id
            }
        });
        res.json(genreToDelete);
    } catch(e) {
        console.log(e);
    }
};

// Handle Genre delete on POST.
exports.genre_delete_post = async function(req, res, next) {
    console.log("entered genre_delete_post controller");
    try {
        const deletedGenre = await Genre.destroy({
            where: {
                genre_id: req.params.id
            }
        })
        res.json(deletedGenre);
    } catch(e) {
        console.log("entered catch block in delete_post controller")
        next(e);
    }
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
exports.genre_update_post = async function(req, res, next) {
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
        console.log(e.name);
        next(e);
    }
};
