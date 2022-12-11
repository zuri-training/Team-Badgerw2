const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const alumniSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    yearOfEntry: { type: Date, required: true },
    registrationNumber: { type: String, required: true },
    yearOfGraduation: { type: Date, required: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "donations" }],
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "cards" }],
  },
  { timestamps: true }
);

const donationsSchema = new Schema(
  {
    amount: { type: String, required: true },
    frequency: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      default: "monthly",
    },
    userDetails: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const cardsSchema = new Schema(
  {
    name: String,
    expiryDate: Date,
    cardNumber: Number,
    userDetails: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const alumni = mongoose.model("alumni", alumniSchema);
const donations = mongoose.model("donations", donationsSchema);
const cards = mongoose.model("cards", cardsSchema);

module.exports = {
  alumni,
  donations,
  cards,
};
