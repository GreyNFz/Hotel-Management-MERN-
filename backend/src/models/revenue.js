import mongoose from  'mongoose';

const Schema = mongoose.Schema;

const revenueSchema = new Schema({

    revenueId: {
        type: String,
        required: true,
    },
    revenueType: {
        type: String,
        required: true,
    },
    totalRevenue: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },

});

export const Revenue = mongoose.model('revenue',revenueSchema);