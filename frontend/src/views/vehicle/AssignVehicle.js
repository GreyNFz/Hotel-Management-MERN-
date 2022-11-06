import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import 'moment-timezone';

import {assignVehicle, getAvaiableNotAssignedVehicles, getSelectedVehicle} from '../../controllers/vehicle.js';
import {getSelectedReservation, getCurrentReservations} from '../../controllers/reservation.js';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AssignVehicle() {

    const [vehicleId, setVehicleId] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [pricePerKM, setPricePerKM] = useState("");
    const [reservationId, setReservationId] = useState("");
    const [reservationName, setReservationName] = useState("");
    const [reservationNic, setReservationNic] = useState("");
    const [distance, setDistance] = useState("");
    const [dateT, setDateT] = useState("");
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");

    const [vehicleList, setVehicleList] = useState([]);
    const [reservationList, setReservationList] = useState([]);

    const today = new Date();

    useEffect(() => {
        getCurrentReservations().then((result) => {
			console.log(result)
			let reservations = [];
			for (let item of result) {
				reservations.push({ value: item._id, label: item.name })
			}
			setReservationList(reservations);
        });
    }, [])

    const onAssignVehicle = () => {
        if (vehicleId == "" && reservationId == "" && dateT == "" && start == "" && destination == "" && distance == "") {
            swal("Please fill the from to proceed")
        } else if (dateT == "") {
            swal("Please select a date")
        } else if (vehicleId == "") {
            swal("Please select a vehicle")
        } else if (reservationId == "") {
            swal("Please select a customer")
        } else if (start == "") {
            swal("Please enter a start place")
        }else if (destination == "") {
            swal("Please enter a destination")
        } else if (distance == "") {
            swal("Please enter the distance")
        } else if (isNaN(distance)) {
            swal("Please enter a valid distance")
        }else {   
            let newItem = {
                vehicleId: vehicleId,
                vehicleNumber: vehicleNumber,
                pricePerKM: pricePerKM,
                date: formatDate(dateT),
                reservationId: reservationId,
                reservationName: reservationName,
                reservationNic: reservationNic,
                distance: distance,
                start: start,
                destination: destination,
                assignedDate: formatDate(new Date())
            }
            console.log(newItem);
            assignVehicle(newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Vehicle assigned successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: "Something went wrong went wrong. Try again",
                        icon: 'error',
                        dangerMode: true,
                        button: false,
                    })
                }
            })
            .catch ((err) => {
                swal({
                    title: "Error!",
                    text: "Something went wrong with the network. Try reloading page",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                })
                .then((reload) => {
                    window.location.reload();
                });
            })
        }
    }

    const onReset = () => {
        setVehicleId("");
        setVehicleNumber("");
        setPricePerKM("");
        setReservationId("");
        setReservationName("");
        setReservationNic("");
        setDistance("");
        setDateT("");
        setStart("");
        setDestination("");
        setDateT(new Date());
    }

    const formatDate = (date) => {
        if (!date) {return ''}
        let [y,m,d] = [date.getFullYear(), date.getMonth(), date.getDate()];
        m += 1;
        if (m<10) 
            m = "0" + m
        if (d<10)
            d = "0" + d
        return(`${y}-${m}-${d}`)
    }

    const onChangeDate = async (date) => {
        setDateT(date);
        // let dateMoment = Moment.utc();
        // console.log(formatDate(date));
        await getAvaiableNotAssignedVehicles(formatDate(date)).then((res)  => {
            console.log(res);
            let keepers = [];
            for (let item of res) {
                keepers.push({ value: item._id, label: item.number + " (" + item.type + ")" })
            }
            setVehicleList(keepers);
        })
        setVehicleId("");
        setVehicleNumber("");
        setPricePerKM("")
    }

    const onVehicleChange = async (e) => {
        setVehicleId(e.value);
        setVehicleNumber(e.label);
        getSelectedVehicle(e.value).then((res) => {
            setPricePerKM(res.pricePerKM);
        })
    }

    const onCustomerChange = async (e) => {
        setReservationId(e.value);
        setReservationName(e.label);
        getSelectedReservation(e.value).then((res) => {
            setReservationNic(res.nic);
        })
    }

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>
			<Navbar />
			<div class="main" style={{backgroundColor: '#D3D3D3'}}>
				{/* top nav */}
				<main class="content mt-3">
					<div class="container-fluid">
						<div class="header">
							<h1 class="header-title mt-1">
								Transport Management
							</h1>
						</div>
						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Assign Vehicle</h5>
                                    </div>
                                    <div class="row px-4 mb-2">
                                    <div class="mb-3 col-md-6">
                                            <label for="zipCode">Date</label>
                                            <DatePicker
                                                utcOffset={0}
                                                onChange={(date:Date) => {onChangeDate(date)}}
                                                className="form-control"
                                                minDate={today}
                                                selected={dateT}
                                                customInput={
                                                <input
                                                    type="text"
                                                    id="validationCustom01"
                                                    placeholder="First name"
                                                />
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Vehicle</label>
                                            <Select
                                                isClearable
                                                isSearchable
                                                options={vehicleList}
                                                onChange={(e) => onVehicleChange(e)}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Price Per KM</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setPricePerKM(e.target.value)} value={pricePerKM} disabled/>
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Customer</label>
                                            <Select
                                                isClearable
                                                isSearchable
                                                options={reservationList}
                                                onChange={(e) => onCustomerChange(e)}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Customer NIC</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setReservationNic(e.target.value)} value={reservationNic} disabled/>
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Start</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setStart(e.target.value)} value={start}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Destination</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setDestination(e.target.value)} value={destination}/>
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Distance</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setDistance(e.target.value)} value={distance}/>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAssignVehicle}>Add</button>
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} 
                                                onClick={onReset} >Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

					</div>
				</main>
			</div>
		</div>
	)

}

