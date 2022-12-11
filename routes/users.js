var express = require('express');
var router = express.Router();
var userscontroller=require('../controllers/usercontroller');

/* GET users listing. */
router.get('/',"usercontroller/") 

module.exports = router;
