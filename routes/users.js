var express = require('express');
var router = express.Router();
var userscontroller=require('../controllers/usercontroller');

/* GET users listing. */
router.post('/users/signup',"usercontroller.signup") ;
router.post('/users/login',"usercontroller.login") ;

module.exports = router;
