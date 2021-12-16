const Author = require('../models/Author');
const db = require("../config/database");

// Display list of all Authors
exports.author_list = async function(req, res) {
    try {
        const promise = await Author.findAll({
            order: [
                ['family_name', 'ASC'],
                ['first_name', 'ASC']
            ]
        });
        //console.log("author_list: " + JSON.stringify(promise));
        res.json(promise);
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
exports.author_create_post = async function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Author create POST');
    /*try {
        const newAuthor = await Author.create({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.dateOfBirth,
            date_of_death: req.body.dateOfDeath
        })
        res.json(newAuthor);
    } catch(e) {
        console.log(e);
    }*/
    console.log('req.body in author_create_post: ' + JSON.stringify(req.body))
    try {
        if (req.body.dateOfDeath) {
            console.log('entered if block of author_create_post')
            const [results, metadata] = await db.query("PREPARE stmt1 FROM 'INSERT INTO authors (first_name, family_name, date_of_birth, date_of_death, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())'")
            const [results2, metadata2] = await db.query(`SET @a = '${req.body.first_name}'`)
            const [results3, metadata3] = await db.query(`SET @b = '${req.body.family_name}'`)
            const [results4, metadata4] = await db.query(`SET @c = '${req.body.dateOfBirth}'`)
            const [results5, metadata5] = await db.query(`SET @d = '${req.body.dateOfDeath}'`)
            const [results6, metadata6] = await db.query("EXECUTE stmt1 USING @a, @b, @c, @d")
            const [results7, metadata7] = await db.query("DEALLOCATE PREPARE stmt1")
            res.json(results6)
        } else {
            console.log('entered else block of author_create_post')
            const [results, metadata] = await db.query("PREPARE stmt1 FROM 'INSERT INTO authors (first_name, family_name, date_of_birth, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())'")
            const [results2, metadata2] = await db.query(`SET @a = '${req.body.first_name}'`)
            const [results3, metadata3] = await db.query(`SET @b = '${req.body.family_name}'`)
            const [results4, metadata4] = await db.query(`SET @c = '${req.body.dateOfBirth}'`)
            const [results6, metadata6] = await db.query("EXECUTE stmt1 USING @a, @b, @c")
            const [results7, metadata7] = await db.query("DEALLOCATE PREPARE stmt1")
            res.json(results6)
        }
    } catch(e) {
        console.log(e)
        next(e)
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
exports.author_delete_post = async function(req, res, next) {
    try {
        const deletedAuthor = await Author.destroy({
            where: {
                author_id: req.params.id
            }
        });
        res.json(deletedAuthor);
    } catch(e) {
        console.log("error message in authorController: " + e)
        next(e)
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
        /*const authorObject = await Author.update({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.birthDate,
            date_of_death: req.body.deathDate
        }, {
            where: {
                author_id: req.params.id
            }
        })
        res.json(authorObject);*/
        console.log('req.body in author_update_post: ' + JSON.stringify(req.body))
        if (req.body.deathDate) {
            console.log('entered if block of author_update_post')
            const [results, metadata] = await db.query("PREPARE stmt1 FROM 'UPDATE authors SET first_name=?, family_name=?, date_of_birth=?, date_of_death=?, updatedAt=NOW() WHERE author_id=?'")
            const [results2, metadata2] = await db.query(`SET @a = '${req.body.first_name}'`)
            const [results3, metadata3] = await db.query(`SET @b = '${req.body.family_name}'`)
            const [results4, metadata4] = await db.query(`SET @c = '${req.body.birthDate}'`)
            const [results5, metadata5] = await db.query(`SET @d = '${req.body.deathDate}'`)
            const [results6, metadata6] = await db.query(`SET @e = '${req.params.id}'`)
            const [results7, metadata7] = await db.query("EXECUTE stmt1 USING @a, @b, @c, @d, @e")
            const [results8, metadata8] = await db.query("DEALLOCATE PREPARE stmt1")
            res.json(results7)
        } else {
            console.log('entered else block of author_update_post')
            const [results, metadata] = await db.query("PREPARE stmt1 FROM 'UPDATE authors SET first_name=?, family_name=?, date_of_birth=?, date_of_death=?, updatedAt=NOW() WHERE author_id=?'")
            const [results2, metadata2] = await db.query(`SET @a = '${req.body.first_name}'`)
            const [results3, metadata3] = await db.query(`SET @b = '${req.body.family_name}'`)
            const [results4, metadata4] = await db.query(`SET @c = '${req.body.birthDate}'`)
            const [results5, metadata5] = await db.query(`SET @d = null`)
            const [results6, metadata6] = await db.query(`SET @e = '${req.params.id}'`)
            const [results7, metadata7] = await db.query("EXECUTE stmt1 USING @a, @b, @c, @d, @e")
            const [results8, metadata8] = await db.query("DEALLOCATE PREPARE stmt1")
            res.json(results6)
        }
    } catch(e) {
        console.log(e);
    }

}

