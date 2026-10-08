const mongoose=require('mongoose');
const appointmentSchema=new mongoose.Schema({
  name:String,email:String,doctor:String,date:String,note:String,createdAt:{type:Date,default:Date.now}
});
module.exports=mongoose.model('Appointment',appointmentSchema);
