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
      const yearOfEntry=req.body.yearofadmission
      const registrationNumber=req.body.regno
      const yearOfGraduation=req.body.yearofgrad
      const faculty=req.body.faculty
    

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
      return res.status(409).send("Alumni Exist, Please Login. ");
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

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// LOGIN USERS
const login = async (req, res) => {
    try {
    
      const user = await alumni.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json("Wrong Details, Try Again");
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
  
      if (!match) {
        return res.status(400).json("Wrong password, Try Again");
      }
  
      const { password, ...others } = user._doc;
      res.status(200).json({ others});
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  module.exports = {signup, login}
