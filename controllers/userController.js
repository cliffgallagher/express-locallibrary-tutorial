const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

exports.user_login_post = async function(req, res, next) {
    try {
        //console.log('req.body in user_login_post: ' + JSON.stringify(req.body))
        const user = await User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                username: req.body.loginUsername
            }
        })
        console.log('what returns from User.findAll: ' + JSON.stringify(user))
        if (await bcrypt.compare(req.body.loginPassword, user[0].password)) {
            //console.log('success')
            //console.log('stringify user: ' + JSON.stringify(user[0]))
            const stringifiedUser = JSON.stringify(user[0])
            const accessToken = jwt.sign(stringifiedUser, process.env.ACCESS_TOKEN_SECRET)
            res.json({...user[0].dataValues, accessToken: accessToken})
        }
    } catch(e) {
        console.log(e)
        next(e)
    }
}