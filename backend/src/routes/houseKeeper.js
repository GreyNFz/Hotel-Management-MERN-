import express, { Router } from 'express';

import { 
    addHouseKeeper, viewHouseKeepers, getHouseKeeper, editHouseKeeper, deleteHouseKeeper, 
} from '../controllers/houseKeeper.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addHouseKeeper));
router.get('/allHouseKeepers',  catchAsync(viewHouseKeepers));
router.get('/getHouseKeeper/:id',  catchAsync(getHouseKeeper));
router.post('/update/:id',  catchAsync(editHouseKeeper));
router.get('/delete/:id',  catchAsync(deleteHouseKeeper));
// router.get('/assignTaskToHouseKeeper/:id/:room',  catchAsync(assignTaskToHouseKeeper));
// router.get('/completeAssignedTask/:id',  catchAsync(completeAssignedTask));

export default router;