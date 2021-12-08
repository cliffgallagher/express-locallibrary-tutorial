const User = require('../models/User')

exports.user_create_post = async function(req, res) {
    console.log('req.body in user_create_get')
    const newUser = await User.create({
        first_name: req.body.newUserFirstName,
        last_name: req.body.newUserLastName,
        email: req.body.newUserEmail,
        password: req.body.newUserPassword
    })
    res.json(newUser);
} 