import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {addReservation, getSelectedReservationByNic, getReservationsInAGivenPeriod} from '../../controllers/reservation.js';
import {getAvailableRooms, getSelectedTypeAvailableRooms} from '../../controllers/room.js';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AddReservation() {

    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLne2, setAddressLne2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("");
    const [roomType, setRoomType] = useState("");
    const [room, setRoom] = useState("");
    const [numOfAdults, setNumOfAdults] = useState("");
    const [numOfChildren, setNumOfChildren] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [today, setToday] = useState(new Date());

    const [rooms, setRooms] = useState([]);

    const onAddReservation = () => {
        if (name == "" && nic == "" && phoneNumber == "" && addressLine1 == "" && addressLne2 == "" && city == "" &&
         state == "" && zipCode == "" && email == "" && roomType == "" && room == "" && numOfAdults == "" && numOfChildren == "") {
            swal("Please fill the from to proceed")
        } else if (nic == "") {
            swal("Please enter the NIC")
        }else if (nic.length < 11) {
            swal("Please enter a valid NIC number")
        } else if (name == "") {
            swal("Please enter the name")
        } else if (phoneNumber == "") {
            swal("Please enter the Contact Number")
        }else if (phoneNumber.length < 9) {
            swal("Please enter a valid Number")
        }else if (addressLine1 == "") {
            swal("Please enter the Address Line 1")
        } else if (city == "") {
            swal("Please enter the city")
        } else if (state == "") {
            swal("Please enter the State")
        } else if (zipCode == "") {
            swal("Please enter the Zip Code")
        } else if (email == "") {
            swal("Please enter the Email")
        }else if (!validateEmail(email)) {
            swal("Please enter a valid Email")
        }else if (roomType == "") {
            swal("Please select the room type")
        } else if (room == "") {
            swal("Please select a availale room")
        } else if (numOfChildren !== "" && isNaN(numOfChildren)) {
            swal("Please a valid number for number of childern")
        } else if (numOfAdults !== "" && isNaN(numOfAdults)) {
            swal("Please a valid number for number of adults")
        } else {   
            let newItem = {
                name: name,
                nic: nic,
                phoneNumber: phoneNumber,
                addressLine1: addressLine1,
                addressLne2: addressLne2,
                city: city,
                state: state,
                zipCode: zipCode,
                email: email,
                checkInDate: startDate,
                checkOutDate: endDate,
                roomType: roomType,
                room: room,
                numOfAdults: numOfAdults,
                numOfChildren: numOfChildren
            }
            if (numOfAdults == "") 
                newItem.numOfAdults= "0"
            else
                newItem.numOfAdults= numOfAdults
            if (numOfChildren == "") 
                newItem.numOfChildren= "0"
            else
                newItem.numOfChildren= numOfChildren
            console.log(newItem);
            addReservation(newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Reservation added successfully",
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
        setName("");
        setNic("");
        setPhoneNumber("");
        setAddressLine1("");
        setAddressLne2("");
        setCity("");
        setZipCode("");
        setEmail("");
        setRoomType("");
        setRooms([]);
        setRoom("");
        setNumOfAdults("");
        setNumOfChildren("");
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const onChangeNic = (e) => {
        setNic(e.target.value);
        if (e.target.value !== "") {
            getSelectedReservationByNic(e.target.value).then((result) => {
                if(result) {
                    setName(result.name);
                    setPhoneNumber(result.phoneNumber);
                    setAddressLine1(result.addressLine1);
                    setAddressLne2(result.addressLne2);
                    setCity(result.city)
                    setState(result.state);
                    setZipCode(result.zipCode);
                    setEmail(result.email);
                }
            })
        }
    }

    const onChangeRoomType = async (e) => {
        setRoomType(e.value);
        setRoom("");
        checkForAvailableRooms(e.value);
    }

    const checkForAvailableRooms = async (type) => {
        let roomsArr = [];
        let optionArr = [];
        await getSelectedTypeAvailableRooms(type).then((result) => {
            // console.log(result);           
            for (const room of result) {
                roomsArr.push(room.name)
            }
        })
        await getReservationsInAGivenPeriod(startDate, endDate).then((result) => {
            // console.log(result);
            if (result.length > 0) {
                for (const reservation of result) {
                    // console.log(reservation.room)
                    // console.log(roomsArr)
                    const index = roomsArr.indexOf(reservation.room);
                    // console.log(index)
                    if (index > -1) { // only splice array when item is found
                        roomsArr.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }  
            }  
            
            for (let room of roomsArr) {
                optionArr.push({ value: room, label: room })
            }  
            if (optionArr.length < 1) {
                swal("No " + type + " rooms avaiable for the selected time period")
            }
            setRooms(optionArr); 
        })
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>
			<Navbar />
			<div class="main" style={{backgroundColor: '#D3D3D3'}}>
				{/* top nav */}
				<main class="content mt-3">
					<div class="container-fluid">
						<div class="header">
							<h1 class="header-title mt-1">
								Reservation Management
							</h1>
						</div>
						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">ADD NEW RESERVATION</h5>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="roomCode">NIC</label>
                                            <input type="text" class="form-control"name="nic" 
                                            onChange={onChangeNic} value={nic}/>
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control"name="name" 
                                            onChange={(e) => setName(e.target.value)} value={name}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">Phone Number</label>
                                            <input type="text" class="form-control"name="phoneNumber" 
                                            onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="addressLine1">Address Line 01</label>
                                            <input type="text" class="form-control"name="addressLine1" 
                                            onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="addressLine2">Address Line 02 (Optional)</label>
                                            <input type="text" class="form-control"name="addressLine2" 
                                            onChange={(e) => setAddressLne2(e.target.value)} value={addressLne2}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="city">City</label>
                                            <input type="text" class="form-control"name="city" 
                                            onChange={(e) => setCity(e.target.value)} value={city}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="state">State</label>
                                            <input type="text" class="form-control"name="state" 
                                            onChange={(e) => setState(e.target.value)} value={state}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="zipCode">Zip Code</label>
                                            <input type="text" class="form-control"name="zipCode" 
                                            onChange={(e) => setZipCode(e.target.value)} value={zipCode}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="email">Email</label>
                                            <input type="text" class="form-control"name="email" 
                                            onChange={(e) => setEmail(e.target.value)} value={email}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="zipCode">Check In Date</label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={() => {setStartDate(date); checkForAvailableRooms(roomType); setRoom("");}}
                                                className="form-control"
                                                minDate={today}
                                                customInput={
                                                <input
                                                    type="text"
                                                    id="validationCustom01"
                                                    placeholder="First name"
                                                />
                                                }
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="email">Check Out Date</label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={() => {setEndDate(date); checkForAvailableRooms(roomType); setRoom("");}}
                                                className="form-control"
                                                minDate={startDate}
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
                                            <label for="type">Room Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={
                                                [
                                                    { value: 'Single', label: 'Single' },
                                                    { value: 'Double', label: 'Double' },
                                                    { value: 'Triple', label: 'Triple' },
                                                    { value: 'Queen', label: 'Queen' },
                                                    { value: 'Executive ', label: 'Executive' }
                                                ]
                                            }
                                            onChange={onChangeRoomType}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Room</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={rooms}
                                            onChange={(e) => setRoom(e.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="numOfAdults">Number of Adults</label>
                                            <input type="text" class="form-control"name="numOfAdults" 
                                            onChange={(e) => setNumOfAdults(e.target.value)} value={numOfAdults}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="numOfChildren">Number of Children</label>
                                            <input type="text" class="form-control"name="numOfChildren" 
                                            onChange={(e) => setNumOfChildren(e.target.value)} value={numOfChildren}/>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddReservation}>Add</button>
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

