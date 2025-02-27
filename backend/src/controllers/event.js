import {Event} from "../models/event.js";

export const addEvent = async (req, res) => {
    // console.log(req.body);
    const newEvent = new Event({
        type: req.body.type,
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber ,
        address: req.body.address , 
        totalCount: req.body.totalCount ,
        locationType: req.body.locationType ,
        date: req.body.date ,
        time: req.body.time ,
    })

    newEvent = await newEvent.save().then((event)=>{
        res.send(event);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the Event Reservation",error:err.message})
    })
}

export const viewEvents = async (req, res) => {
    await Event.find().then((events)=>{
        res.send(events);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getEvent = async (req, res) => {
    let id = req.params.id;
    await Event.findById(id).then((event)=>{
        res.send(event);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getEventsForSelectedDateAndLocation = async (req, res) => {
    const date = req.params.date;
    const location = req.params.location; 
    await Event.find({locationType: location, date: date}).then((event)=>{
        res.send(event);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editEvent = async (req, res) => {
    let id = req.params.id;
    
    const newEvent = {
        type: req.body.type,
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber ,
        address: req.body.address , 
        totalCount: req.body.totalCount ,
        locationType: req.body.locationType ,
        date: req.body.date ,
        time: req.body.time ,
    };

    newEvent = await Event.findByIdAndUpdate(id, newEvent).then((newEvent) => {
        res.status(200).send({status: "Reservation Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteEvent = async (req, res) => {
    let id = req.params.id;
    await Event.findByIdAndDelete(id).then((event) => {
        res.send(event);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}