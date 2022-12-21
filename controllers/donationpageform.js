var donation = require('../models/model').donations;
exports.donationPageCont = (req, res) => {

  req.on('error', (error) => {
    console.log(error)
    res.sendStatus(500)
  }
  );

try {
    const donors = await donation.find();
    const amount = donors.amount
    res.render('donation', {
      title: "Donation Form",
      css: '/stylesheets/donation.css',
      donors: donors.length,
      amounts: 0
    });
  } catch (error) {
    res.render('error', { message: "An error Occured", error: error });
  }




}
