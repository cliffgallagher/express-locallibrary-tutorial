const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const db = require("../config/database");

exports.user_create_post = async function(req, res, next) {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.newUserPassword, salt)
        const [results, metadata] = await db.query("PREPARE stmt1 FROM 'INSERT INTO users (first_name, last_name, email, password, createdAt, updatedAt, username) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)'")
        const [results2, metadata2] = await db.query(`SET @a = '${req.body.replacedNewUserFirstName}'`)
        const [results3, metadata3] = await db.query(`SET @b = '${req.body.replacedNewUserLastName}'`)
        const [results4, metadata4] = await db.query(`SET @c = '${req.body.replacedNewUserEmail}'`)
        const [results5, metadata5] = await db.query(`SET @d = '${hashedPassword}'`)
        const [results6, metadata6] = await db.query(`SET @e = '${req.body.replacedNewUserUsername}'`)
        const [results8, metadata8] = await db.query(`EXECUTE stmt1 USING @a, @b, @c, @d, @e`)
        const [results9, metadata9] = await db.query("DEALLOCATE PREPARE stmt1")
        res.json(results8)
    } catch(e) {
        next(e);
    }

}

exports.user_login_post = async function(req, res, next) {
    try {
        const [results, metadata] = await db.query("PREPARE stmt1 FROM 'SELECT username, password FROM users WHERE (username = ?)'")
        const [results2, metadata2] = await db.query(`SET @a = '${req.body.escapedUsername}'`)
        const [results3, metadata3] = await db.query("EXECUTE stmt1 USING @a")
        const [results4, metadata4] = await db.query("DEALLOCATE PREPARE stmt1")
        if ((results3[0].username === req.body.loginUsername) && (await bcrypt.compare(req.body.loginPassword, results3[0].password))) {
                const stringifiedUser = JSON.stringify(results3[0].username)
                const accessToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 15),
                    data: stringifiedUser 
                }, process.env.ACCESS_TOKEN_SECRET)
                res.cookie('token', accessToken, {httpOnly: true, sameSite: "Lax"})
                res.json({...stringifiedUser, accessToken: accessToken})          
        } else {
            res.status(403).json({
                errors: [{
                    msg: 'Incorrect username/password'
                }]
            })
        }
    } catch(e) {
        //console.log('error in catch block: ' + e)
        //next(e)
        res.status(403).json({
            errors: [{
                msg: 'Incorrect username/password'
            }]
        })
    }
}

exports.user_login_cookies = async function(req, res, next) {
    try {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).json({success: 'success', token: req.cookies.token})
        } else {
            res.status(401).json({failed: 'failed'})
        }
    } catch(e) {
        //console.log(e)
        next(e)
    }
}

exports.user_logout_post = async function(req, res, next) {
    res.cookie('token', null)
    res.json('logged out')
}