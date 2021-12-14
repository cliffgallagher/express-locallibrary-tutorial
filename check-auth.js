const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error()
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch(e) {
        //res.status(401).json(e)
        //console.log('error name: ' + e.name)
        next(e)
    }
}