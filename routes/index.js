var express = require('express');
var router = express.Router();
var path = require('path');


const donationFormController = require('../controllers/donationpageform');
const landingController = require('../controllers/landing');
const pageController = require('../controllers/createpage');
;
router.use(express.static(path.join(__dirname, '../public')));
/* GET home page. */
router.get('/', landingController.landingcont);
router.get('/donationform', donationFormController.donationPageCont);
router.get('/create-donation', pageController.createPageCont);
module.exports = router;
