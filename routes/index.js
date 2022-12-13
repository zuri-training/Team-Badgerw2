
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
router.get('/',auth.optional, landingController.landingCont);
router.get('/login',auth.optional,userController.login);
router.get('/signup',auth.optional,userController.signup);
//router.get('/donate-new',auth.required, donateController.donateCont );



module.exports = router;
