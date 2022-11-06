import {Reservation} from "../models/reservation.js";

export const addReservation = async (req, res) => {
    // console.log(req.body);
    let newReservation = new Reservation({
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate ,
        roomType: req.body.roomType,
        room: req.body.room,
        numOfAdults: req.body.numOfAdults ,
        numOfChildren: req.body.numOfChildren,
    })

    newReservation = await newReservation.save().then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the reservation",error:err.message})
    })
}

export const viewReservations = async (req, res) => {
    await Reservation.find().then((reservations)=>{
        res.send(reservations);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationByNic = async (req, res) => {
    let nic = req.params.nic;
    await Reservation.findOne({nic: nic}).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationById = async (req, res) => {
    let id = req.params.id;
    await Reservation.findById(id).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationByRoom = async (req, res) => {
    let room = req.params.room;
    await Reservation.find({room:room}).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationsInAGivenPeriod = async (req, res) => {
    let checkInDate = req.params.checkInDate;
    let checkOutDate = req.params.CheckOutDate;
    // console.log(checkOutDate)
    // console.log(req.params)
    // let dateStartArr = checkInDate.substring(0,10).split('-');
    // let dateEndArr = checkOutDate.substring(0,10).split('-');

    await Reservation.find({$or:[{"checkInDate": {$lt: checkInDate}, "checkOutDate" : {$gte: checkInDate}}, 
        { "checkInDate": {$gte: checkInDate}, "checkOutDate" : {$lte: checkOutDate} },
        {"checkInDate": {$lte: checkOutDate}, "checkOutDate" : {$gte: checkOutDate} },
    ]}).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getCurrentReservations = async (req, res) => {
    const date = new Date().toISOString();
    // console.log(date)
    await Reservation.find({"checkInDate": {$lte: date}, "checkOutDate" : {$gt: date}}).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editReservation = async (req, res) => {
    let id = req.params.id;
    
    const newReservation = {
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email,
        checkInDate: req.body.checkInDate ,
        checkOutDate: req.body.checkOutDate ,
        roomType: req.body.roomType,
        room: req.body.room,
        numOfAdults: req.body.numOfAdults ,
        numOfChildren: req.body.numOfChildrens,
    };

    newReservation = await Reservation.findByIdAndUpdate(id, newReservation).then((newReservation) => {
        res.status(200).send({status: "Reservation Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteReservation = async (req, res) => {
    let id = req.params.id;
    await Reservation.findByIdAndDelete(id).then((reservation) => {
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}