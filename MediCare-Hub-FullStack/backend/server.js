require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(cors());
app.use(express.json());

const appointmentSchema=new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  doctor:{type:String,required:true},
  date:{type:String,required:true},
  note:String,
  createdAt:{type:Date,default:Date.now}
});
const Appointment=mongoose.model('Appointment',appointmentSchema);

app.get('/api/health',(req,res)=>res.json({status:'ok',message:'MediCare API is running'}));

app.post('/api/appointments',async(req,res)=>{
  try{
    const appointment=await Appointment.create(req.body);
    res.status(201).json({message:'Appointment saved',appointment});
  }catch(err){
    res.status(400).json({message:'Could not save appointment',error:err.message});
  }
});

app.get('/api/appointments',async(req,res)=>{
  try{
    const appointments=await Appointment.find().sort({createdAt:-1});
    res.json(appointments);
  }catch(err){res.status(500).json({message:err.message});}
});

const PORT=process.env.PORT||5000;
async function start(){
  if(process.env.MONGO_URI){
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    }catch(err){console.log('MongoDB connection failed:',err.message);}
  }else{
    console.log('MONGO_URI not set. API will start without database connection.');
  }
  app.listen(PORT,()=>console.log(`MediCare API running on http://localhost:${PORT}`));
}
start();
