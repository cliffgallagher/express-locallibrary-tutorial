var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body, validationResult } = require('express-validator')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool/', function(req, res, next) {
  res.json('You\'re so cool!');
});

router.post('/create',
body('newUserFirstName').not().isEmpty().withMessage("First name cannot be blank"),
body('newUserLastName').not().isEmpty().withMessage("Last name cannot be blank"),
body('newUserEmail').isEmail().withMessage('Please enter a valid email address'),
body('newUserPassword').isLength({
  min: 8,
  max: 16
}).withMessage('Password must be between 8 and 16 characters long'),
body('newUserPassword').isStrongPassword().withMessage('Password must contain 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character'),
body('newUserConfirmedPassword').custom((value, { req }) => {
  if (value !== req.body.newUserPassword) {
    throw new Error('Password confirmation does not match password');
  }
  return true;
}),

function(req, res, next) {
  //console.log("inside user/create validation function: " + JSON.stringify(req.body))
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}, userController.user_create_post)

router.post('/login', 
body('loginUsername').not().isEmpty().withMessage('Please enter a username'),
body('loginPassword').not().isEmpty().withMessage('Please enter a password'),
function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}, userController.user_login_post)

router.post('/checkcookies', (req, res, next) => {
  console.log('entered cookie_login route')
  next()
}, userController.user_login_cookies)

module.exports = router;
