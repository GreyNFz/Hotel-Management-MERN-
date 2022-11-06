import { Revenue } from "../models/revenue.js";

export const addRevenue = async (req, res) => {
    console.log(req.body)

    let newRevenue = new Revenue({
        revenueId: req.body.revenueId,
        revenueType: req.body.revenueType,
        totalRevenue: req.body.totalRevenue,
        startDate: req.body.startDate,
        endDate: req.body.endDate,

    })

    newRevenue = await newRevenue.save().then((revenue)=>{
        res.send(revenue);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Couldn't add the revenue",error:err.message})
    })
}

export const viewRevenue = async (req, res) => {
    await Revenue.find().then((revenue)=>{
        res.send(revenue);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Erro with entered data",erro:err.message})
    })
}

export const getRevenue = async (req, res) => {
    let id = req.params.id;
    await Revenue.findById(id).then((revenue)=>{
        res.send(revenue);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editRevenue = async (req, res) => {
    let id = req.params.id;
    
    const newRevenue = {
        revenueId: req.body.revenueId,
        revenueType: req.body.revenueType,
        totalRevenue: req.body.totalRevenue,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    newRevenue = await Revenue.findByIdAndUpdate(id, newRevenue).then((newRevenue) => {
        res.status(200).send({status: "Reservation Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteRevenue = async (req, res) => {
    let id = req.params.id;
    await Revenue.findByIdAndDelete(id).then((revenue) => {
        res.send(revenue);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}