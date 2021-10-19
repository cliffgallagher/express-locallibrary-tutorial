const async = require('async');
const database = require('./config/database');
const parallel = require('async/parallel');
const Author = require('./models/Author.js');
const Genre = require('./models/Genre');
var book_controller = require('./controllers/bookController');

console.log("hello cliff");

/*async.parallel({
    one: function(callback) {
        setTimeout(() => {callback(null, "Result of async function one")}, 5000);
    },
    two: function(callback) {
        setTimeout(() => {callback(null, "Result of async function two")}, 3000);
    }
}, function(err, results) {
    if (err) {
        console.log("Error statement from final callback function: " + err)
    }
    console.log("Results from final callback function: " + JSON.stringify(results));
});*/

/*async.parallel({
    one: function(callback) {
        setTimeout(() => {console.log("Result of async function one")}, 5000);
    },
    two: function(callback) {
        setTimeout(() => {console.log("Result of async function two")}, 3000);
    }
}, function(err, results) {
    if (err) {
        console.log("Error statement from final callback function: " + err)
    }
    console.log("Results from final callback function: " + JSON.stringify(results));
});*/

 
//Not quite doing what I want but not returning errors
/*async.parallel({
    author_ids: function(callback) {
        callback(null, Author.findAll({
            attributes: ['author_id']
        }));
    },
    genre_ids: function(callback) {
        callback(null, Genre.findAll({
            attributes: ['genre_id']
        }));
    }
}, function(err, results) {
    if (err) {
        console.log("Error from final callback function: " + err);
    }
    console.log("results from final callback function: " + JSON.stringify(results));
})*/

/*async.parallel({
    author_ids: async function() {
        const res = await Author.findAll({
            attributes: ['author_id']
        });
        return res;
    },
    genre_ids: async function() {
        const res = await Genre.findAll({
            attributes: ['genre_id']
        });
        return res;
    }
}, function(err, results) {
    if (err) {
        console.log("Error from final callback function: " + err);
    }
    //console.log("results from final callback function: " + JSON.stringify(results));

    for (item in results) {
        for (let i = 0; i < results[item].length; i++) {
            console.log(results[item][i].dataValues);
        }

    }

})*/

async.parallel({
    author_ids: async function() {
        const res = await Author.findAll({
            attributes: ['author_id']
        });
        return res;
    },
    genre_ids: async function() {
        const res = await Genre.findAll({
            attributes: ['genre_id']
        });
        return res;
    }
}, function(err, results) {
    if (err) {
        console.log("Error from final callback function: " + err);
    }
    console.log("results from final callback function: " + JSON.stringify(results));

})