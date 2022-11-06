import {feedback} from "../models/feedback.js";

export const addfeedback = async (req, res) => {
    // console.log(req.body);
    const newfeedback = new feedback({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber ,
        checkInDate: req.body.checkInDate , 
        checkOutDate: req.body.checkOutDate ,
        roomno: req.body.roomno,
        email: req.body.email,
        comments: req.body.comments
    })

    newfeedback = await newfeedback.save().then((feedback)=>{
        res.send(feedback);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the feedback",error:err.message})
    })
}

export const viewfeedback = async (req, res) => {
    await feedback.find().then((feedback)=>{
        res.send(feedback);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getfeedback = async (req, res) => {
    let id = req.params.id;
    await feedback.findById(id).then((feedback)=>{
        res.send(feedback);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editfeedback = async (req, res) => {
    let id = req.params.id;
    
    const newfeedback = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber ,
        checkInDate: req.body.checkInDate , 
        checkOutDate: req.body.checkOutDate ,
        roomno: req.body.roomno,
        email: req.body.email,
        comments: req.body.comments
    };

    newfeedback = await feedback.findByIdAndUpdate(id, newfeedback).then((newfeedback)=>{
        res.status(200).send({status: "Feedback Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deletefeedback = async (req, res) => {
    let id = req.params.id;
    await feedback.findByIdAndDelete(id).then((feedback)=>{
        res.send(feedback);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}