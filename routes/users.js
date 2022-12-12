var express = require('express');
var router = express.Router();
var userscontroller=require('../controllers/usercontroller');
var auth=require('auth')
/* GET users listing. */
router.post('/users/signup',auth.optional, "usercontroller.signup") ;
router.post('/users/login',auth.optional, "usercontroller.login") ;

module.exports = router;
