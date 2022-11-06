import express, { Router } from 'express';

import { addfeedback, viewfeedback, getfeedback, editfeedback, deletefeedback } from '../controllers/feedback.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addfeedback));
router.get('/feedbacks',  catchAsync(viewfeedback));
router.get('/get/:id',  catchAsync(getfeedback));
router.post('/update/:id',  catchAsync(editfeedback));
router.get('/delete/:id',  catchAsync(deletefeedback));

export default router;