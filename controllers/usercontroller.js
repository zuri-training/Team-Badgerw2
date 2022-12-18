const alumni = require("../models/model").alumni;
const bcrypt = require("bcrypt");

//SIGN UP NEW USERS
const signup = async (req, res) => {
  try {
    
      const email=req.body.email
      const firstName= req.body.firstname
      const lastName=req.body.lastname
      const password= req.body.password
      const dateOfBirth = req.body.dob
      const gender= req.body.gender
      const phoneNumber=req.body.phonenumber
      const yearOfEntry=req.body.yearofadmission.toString()
      const registrationNumber=req.body.regno.toString()
      const yearOfGraduation=req.body.yearofgrad.toString()
      const faculty=req.body.faculty
      const department=req.body.department
    

  /*  if (
      !(
        email &&
        firstName &&
        lastName &&
        password &&
        dateOfBirth &&
        gender &&
        phoneNumber &&
        yearOfEntry &&
        registrationNumber &&
        yearOfGraduation &&
        faculty
      )
    ) {
      return res.status(400).send("All Input Is Required");
    }*/
    const oldUser = await alumni.findOne({ email });
    if (oldUser) {
      return res.status(409).send("An Alumni Exist");
      }
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new alumni({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashpassword,
      dateOfBirth,
      gender,
      phoneNumber,
      yearOfEntry,
      registrationNumber,
      yearOfGraduation,
      faculty,
    });

    const user = await newUser.save();

    //req.flash('success,`You have succesfully registered ${user.firstname}`);
    res.render('dashboard',{user:user})
  } catch (error) {
    return res.status(500).send("An Error occurred ");
  }
};

// LOGIN USERS
const login = async (req, res) => {
    try {
    
      const user = await alumni.findOne({ email: req.body.email });
  
      if (!user) {
         return res.status(400).send("Invalid Details");
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
  
      if (!match) {
     
        return res.status(409).send("Invalid Password Try Again");
      }
  
      const { password, ...others } = user._doc;
      
      res.render('dashboard',{user:user});
    } catch (error) {
      return res.status(500).send("An error occurred");
      }
    };
  

  module.exports = {signup, login}
