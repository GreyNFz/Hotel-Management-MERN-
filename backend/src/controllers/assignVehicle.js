import {AssignVehicle} from "../models/assignVehicle.js";
import {Vehicle} from '../models/vehicle.js';

export const assignVehicle = async (req, res) => {
    // console.log(req.body);
    let newAssignedVehicle = new AssignVehicle({
        vehicleId: req.body.vehicleId,
        vehicleNumber: req.body.vehicleNumber,
        pricePerKM: req.body.pricePerKM ,
        reservationId: req.body.reservationId ,
        reservationName: req.body.reservationName,
        reservationNic: req.body.reservationNic,
        distance: req.body.distance ,
        date: req.body.date ,
        assignedDate: req.body.assignedDate,
        start: req.body.start ,
        destination: req.body.destination,
    });

    await newAssignedVehicle.save().then((newAssignedVehicle)=>{
        res.send(newAssignedVehicle);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't assign the vehicle", error:err.message})
    })
}

export const viewAllAssignedVehicles = async (req, res) => {
    await AssignVehicle.find().then((vehicles)=>{
        res.send(vehicles);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const viewAssignedOfAVehicle = async (req, res) => {
    let vehicleId = req.params.vehicleId;
    await AssignVehicle.find({vehicleId: vehicleId}).then((vehicles)=>{
        res.send(vehicles);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getAvaiableNotAssignedVehicles = async (req, res) => {
    let date = req.params.date;
    let allVehicles = [];
    let busyVehicles = [];
    await Vehicle.find().then((vehicles)=>{
        allVehicles = vehicles;
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
    // console.log(date);
    await AssignVehicle.find({date: date}).then((vehicles)=>{
        busyVehicles = vehicles;
        // console.log(houseKeepers);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
    for (let vehicle of busyVehicles) {
        for (let x of allVehicles) {
            if (x.id == vehicle.vehicleId) {
                let index = allVehicles.indexOf(x);
                allVehicles.splice(index, 1);
            }
        }
    }
    return res.send(allVehicles);
}