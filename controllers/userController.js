const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

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
        //console.log('user[0]: ' + JSON.stringify(user[0]))
        //console.log('user: ' + JSON.stringify(user));
        if (user[0] && (await bcrypt.compare(req.body.loginPassword, user[0].password))) {
                const stringifiedUser = JSON.stringify(user[0])
                const accessToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 30),
                    data: stringifiedUser 
                }, process.env.ACCESS_TOKEN_SECRET)
                res.cookie('token', accessToken, {httpOnly: true, sameSite: "Lax"})
                res.json({...user[0].dataValues, accessToken: accessToken})          
        } else {
            //no matching user/pwd pair found
            res.status(403).json({
                errors: [{
                    msg: 'Incorrect username/password'
                }]
            })
        }
    } catch(e) {
        console.log('error in catch block: ' + e)
        next(e)
    }
}