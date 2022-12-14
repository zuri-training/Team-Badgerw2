var path = require('path');
exports.createPageCont = (req, res) => {

    req.on('error', (error) => {
        console.log(error)
        res.sendStatus(400)
    }
    )


    res.render('createdonation');

}
