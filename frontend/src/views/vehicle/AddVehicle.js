import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {addVehicle} from '../../controllers/vehicle';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AddVehicle() {

    const [number, setNumber] = useState("");
    const [type, setType] = useState("");
    const [numOfSeats, setNumOfSeats] = useState("");
    const [driver, setDriver] = useState("");
    const [pricePerKM, setPricePerKM] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);

    const vehicleTypeArr = [
        { value: 'Bike', label: 'Bike'} ,
        { value: 'Three Wheel', label: 'Three Wheel'} ,
        { value: 'Car', label: 'Car'} ,
        { value: 'Van', label: 'Van'} ,
    ]

    const onAddVehicle = () => {
        if (number == "" && type == "" && numOfSeats =="" && driver == "" && pricePerKM == "") {
            swal("Please fill the form to add a payment")
        } else if (number == "") {
            swal("Please enter the vehicle number")
        }else if (type == "") {
            swal("Please select the vehicle type")
        }else if (numOfSeats == "") {
            swal("Please enter the number of seats in the vehicle")
        }else if (isNaN(numOfSeats)) {
            swal("Please enter a valid number of seats in the vehicle")
        }else if (driver == "") {
            swal("Please enter the driver's name")
        }else if (pricePerKM == "") {
            swal("Please enter a the price per KM")
        }else if (isNaN(pricePerKM)) {
            swal("Please enter a valid number for price per KM")
        } else {
            const newItem = {
                number: number,
                type: type,
                numOfSeats: numOfSeats,
                driver: driver,
                pricePerKM: pricePerKM,
                isAvailable: isAvailable     
            }
            addVehicle(newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Vehicle added successfully",
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
        setNumber("");
        setType("");
        setNumOfSeats("");
        setDriver("");
        setPricePerKM("");
        setIsAvailable(true);
    }

    const onChangeAvailability = () => {
        setIsAvailable(!isAvailable);
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
								Vehicle Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Submit the following form to add a new vehicle</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="number">Vehicle Number</label>
                                            <input type="text" class="form-control" name="number"
                                            onChange={(e) => setNumber(e.target.value)} value={number}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="type">Vehicle Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={vehicleTypeArr}
                                            onChange={(e) => setType(e.value)}
                                            />
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="numOfSeats">Number of seats</label>
                                            <input type="text" class="form-control" name="numOfSeats"
                                            onChange={(e) => setNumOfSeats(e.target.value)} value={numOfSeats}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="driver">Driver</label>
                                            <input type="text" class="form-control" name="driver" 
                                            onChange={(e) => setDriver(e.target.value)} value={driver}/>
                                        </div>
                                    </div>


                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="pricePerKM">Price per KM</label>
                                            <input type="text" class="form-control" name="pricePerKM" 
                                            onChange={(e) => setPricePerKM(e.target.value)} value={pricePerKM}/>
                                        </div>
                                        
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="formFile" class="form-label">Availability</label>
                                            <div class="col-6 mb-1 d-flex align-items-center" >
                                                <Switch onChange={onChangeAvailability} checked={isAvailable} />
                                                {isAvailable ? <p class="fw-semibold monospace mb-0 mx-3 text-success"> Available </p> : 
                                                <p class="fw-semibold monospace mb-0 mx-3 text-danger">Not Available </p>}
                                            </div>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddVehicle}>Add</button>
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

