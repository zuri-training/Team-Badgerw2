var express = require('express');
var router = express.Router();
var path = require('path');



const landingController = require('../controllers/landing');
const loginController = require('../controllers/logincontroller');
;
router.use(express.static(path.join(__dirname, '../public')));
/* GET home page. */
router.get('/', landingController.landingcont);
router.get('/login', loginController.loginform);


module.exports = router;
