import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignVehicle = new Schema({
    
    vehicleId: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    pricePerKM: {
        type: String,
        required: true,
    },
    reservationId: {
        type: String,
        required: true,
    },
    reservationName: {
        type: String,
        required: true,
    },
    reservationNic: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    assignedDate: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
});

export const AssignVehicle = mongoose.model('assignVehicle', assignVehicle);