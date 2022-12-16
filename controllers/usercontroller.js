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
      req.flash("failure",'Alumni Exist, Please Login. ");
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
    res.redirect('dashboard',{user:user})
  } catch (error) {
    req.flash('error','An error occur, cannot register user');
  }
};

// LOGIN USERS
const login = async (req, res) => {
    try {
    
      const user = await alumni.findOne({ email: req.body.email });
  
      if (!user) {
         res.flash('error',"Wrong Details, Try Again");
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
  
      if (!match) {
        req.flash('error',"Wrong password, Try Again");
      }
  
      const { password, ...others } = user._doc;
      res.flash('Login succesful');
      res.redirect('dashboard',{user:user});
    } catch (error) {
      req.flash('error',error.message);
    }
  };

  module.exports = {signup, login}
