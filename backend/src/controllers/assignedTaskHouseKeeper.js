import {AssignedTaskHouseKeeper} from "../models/assignedTaskHouseKeeper.js";
import {HouseKeeper} from '../models/houseKeeper.js';

export const addTask = async (req, res) => {
    // console.log(req.body);
    let newAssignedTask = new AssignedTaskHouseKeeper({
        houseKeeperId: req.body.houseKeeperId,
        houseKeeperName: req.body.houseKeeperName,
        room: req.body.room ,
        date: req.body.date ,
        assignedDate: req.body.assignedDate
    });
    if (req.body.tasks != undefined) {
        newAssignedTask.task= req.body.tasks;
    }

    newAssignedTask = await newAssignedTask.save().then((newAssignedTask)=>{
        res.send(newAssignedTask);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the task",error:err.message})
    })
}

export const viewAllTasks = async (req, res) => {
    await AssignedTaskHouseKeeper.find().then((tasks)=>{
        res.send(tasks);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const viewTasksOfAHouseKeeper = async (req, res) => {
    let houseKeeperId = req.params.houseKeeperId;
    console.log(houseKeeperId)
    await AssignedTaskHouseKeeper.find({houseKeeperId: houseKeeperId}).then((tasks)=>{
        res.send(tasks);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getAvailableHouseKeepers = async (req, res) => {
    let date = req.params.date;
    let allHouseKeepers = [];
    let busyHouseKeepers = [];
    await HouseKeeper.find().then((houseKeepers)=>{
        allHouseKeepers = houseKeepers;
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
    console.log(date);
    await AssignedTaskHouseKeeper.find({date: date}).then((houseKeepers)=>{
        busyHouseKeepers = houseKeepers;
        console.log(houseKeepers);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
    for (let houseKeeper of busyHouseKeepers) {
        for (let x of allHouseKeepers) {
            if (x.id == houseKeeper.houseKeeperId) {
                let index = allHouseKeepers.indexOf(x);
                allHouseKeepers.splice(index, 1);
            }
        }
    }
    return res.send(allHouseKeepers);
}