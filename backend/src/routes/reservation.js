import express, { Router } from 'express';

import {addReservation, viewReservations, getReservationByNic, getReservationById, editReservation, deleteReservation, getReservationsInAGivenPeriod,
getCurrentReservations, getReservationByRoom } from '../controllers/reservation.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addReservation));
router.get('/allReservations',  catchAsync(viewReservations));
router.get('/getReservationByNic/:nic',  catchAsync(getReservationByNic));
router.get('/getReservationById/:id',  catchAsync(getReservationById));
router.get('/getReservationByRoom/:room',  catchAsync(getReservationByRoom));
router.get("/getReservationsInAGivenPeriod/:checkInDate/:CheckOutDate", catchAsync(getReservationsInAGivenPeriod))
router.get("/getCurrentReservations", catchAsync(getCurrentReservations));
router.post('/update/:id',  catchAsync(editReservation));
router.get('/delete/:id',  catchAsync(deleteReservation));

export default router;