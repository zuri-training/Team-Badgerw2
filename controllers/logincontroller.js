var path = require('path');
exports.loginform = (req, res) => {

    req.on('error', (error) => {
        console.log(error)
        res.sendStatus(400)
    }
    )


    res.render('login');

}
