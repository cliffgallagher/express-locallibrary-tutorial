const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.user_create_post = async function(req, res) {
    //console.log('req.body in user_create_get')

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.newUserPassword, salt)
        const newUser = await User.create({
            first_name: req.body.newUserFirstName,
            last_name: req.body.newUserLastName,
            email: req.body.newUserEmail,
            password: hashedPassword
        })
        res.json(newUser);

    } catch(e) {
        console.log(e)
    }

} 