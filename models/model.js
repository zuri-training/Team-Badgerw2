const mongoose=require('mongose')
const {Schema}=mongoose;

const alumiSchema=new Schema({
first_name:{type:String,required:true},
last_name:{ type:String,required:true},
date_of_birth:{type:Date,required:true},
gender:{type:String,required:true, enum:['Male', 'Female']},
email:{type:String,required:true,unique:true},
phone_no:{type:Number,required:true},
year_of_entry:{type:Date,required:true},
reg_no:{type:String,required:true},
year_of_graduation:{ type:Date,required:true},
department:{type:String,required:true},
faculty:{type:String,required:true},
donation:donations,
card: cards

})

const donations= new Schema({
amount:Number,
frequency:String,enum:['monthly', 'quarterly', 'yearly'],
name:String,
email:String,
address:String

});
const cards= new Schema({
name:String,
expiry_date:Date,
card_number:Number,
})

