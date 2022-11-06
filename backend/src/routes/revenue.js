import express, { Router } from 'express';

import { addRevenue,viewRevenue,getRevenue,editRevenue,deleteRevenue, } from '../controllers/revenue.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addRevenue));
router.get('/revenue',  catchAsync(viewRevenue));
router.get('/getRevenue/:id',  catchAsync(getRevenue));
router.post('/update/:id',  catchAsync(editRevenue));
router.get('/delete/:id',  catchAsync(deleteRevenue));

export default router; 