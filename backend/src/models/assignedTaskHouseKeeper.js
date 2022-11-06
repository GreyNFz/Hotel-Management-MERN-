import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignedTaskHouseKeeperSchema = new Schema({
    
    houseKeeperId: {
        type: String,
        required: true,
    },
    houseKeeperName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    task: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    assignedDate: {
        type: String,
        required: true,
    }
});

export const AssignedTaskHouseKeeper = mongoose.model('assignedTaskHouseKeeper', assignedTaskHouseKeeperSchema);