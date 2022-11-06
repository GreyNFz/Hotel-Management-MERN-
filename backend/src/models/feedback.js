import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    roomno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comments:{
        type: String,
        required: true,
    }
});

export const feedback = mongoose.model('feedback', feedbackSchema);