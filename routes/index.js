
var express = require('express');
var router = express.Router();
var path = require('path');
var auth=require('auth')
const landingController = require('../controllers/landing');
const loginController = require('../controllers/login');
const userController = require('../controllers/userscontroller');
//const donateController = require('../controllers/donate');
router.use(express.static('public'));

/* GET home page. */
router.get('/', auth.required, landingController.landingCont);
router.get('/login',auth.optional,loginController.loginCont );
//router.get('/donate-new',auth.required, donateController.donateCont );
module.exports = router;


module.exports = router;
