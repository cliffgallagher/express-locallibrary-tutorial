var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool/', function(req, res, next) {
  res.send('You\'re so cool!');
});

router.post('/create', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  next()
}, userController.user_create_post)

router.post('/login', userController.user_login_post)

module.exports = router;
