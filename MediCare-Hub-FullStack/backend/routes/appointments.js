const express=require('express');
const router=express.Router();
const Appointment=require('../models/Appointment');
router.post('/',async(req,res)=>res.status(201).json(await Appointment.create(req.body)));
router.get('/',async(req,res)=>res.json(await Appointment.find().sort({createdAt:-1})));
module.exports=router;
