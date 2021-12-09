const User = require('../models/User')
const bcrypt = require('bcrypt')
const { nextTick } = require('async')

exports.user_create_post = async function(req, res, next) {
    //console.log('req.body in user_create_post: ' + JSON.stringify(req.body))

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.newUserPassword, salt)
        const newUser = await User.create({
            first_name: req.body.newUserFirstName,
            last_name: req.body.newUserLastName,
            email: req.body.newUserEmail,
            username: req.body.newUserUsername,
            password: hashedPassword
        })
        res.json(newUser);

    } catch(e) {
        console.log('error in user_create_post: ' + e)
        next(e);
    }

}

exports.user_login_post = async function(req, res) {
    try {
        //console.log('req.body in user_login_post: ' + JSON.stringify(req.body))
        const user = await User.findAll({
            where: {
                username: req.body.loginUsername
            }
        })
        //console.log('what returns from User.findAll: ' + JSON.stringify(user))
        if (await bcrypt.compare(req.body.loginPassword, user[0].password)) {
            console.log('success')
        }
    } catch(e) {
        console.log(e)
        next(e)
    }
}