
var express = require('express');
var router = express.Router();
var path = require('path');
const landingController = require('../controllers/landing');
const loginController = require('../controllers/login');
const userController = require('../controllers/userscontroller');
//const donateController = require('../controllers/donate');
router.use(express.static('public'));
router.use(express.static('frontend'));
/* GET home page. */
router.get('/', landingController.landingCont);
router.get('/login',loginController.loginCont );
//router.get('/donate-new',donateController.donateCont );
module.exports = router;


module.exports = router;
