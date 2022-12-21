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
      return res.render('signup', {
        message:" ",
        error: "An Alumni exist"
      });
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

   res.render('login', {
      message:"You have Succesfully Registered ",
      user: user
    })
  } catch (error) {
    return res.render('signup', {
      message: " ",
      error: error
    });
  }
};

// LOGIN USERS
const login = async (req, res) => {
    try {
    
      const user = await alumni.findOne({ email: req.body.email });
  
      if (!user) {
         return res.render('login', {
        message: " ",
        error: "Invalid Email"
      });
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
  
      if (!match) {
     
        return res.render('login', {
        message: " ",
        error: "Invalid Password"
      });
      }
  
      const { password, ...others } = user._doc;
      
      res.render('dashboard', {
      user: user

    });
    } catch (error) {
      res.render('error', { message: "An error Occured", error: error });
      }
    };
  

  module.exports = {signup, login}
