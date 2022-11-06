import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {getSelectedPayment, editPayment} from '../../controllers/payment'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function editFeedaback() {

    const { id } = useParams();

    const [reservationData, setReservationData] = useState({})
    const [reservationId, setReservationId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    // const onChangeCode = (e) => {
    //     setRoomCode(e.target.value)
    //     getSelectedRoomByCode(e.target.value).then((res) => {
    //         console.log(res)
    //         if (res.length <= 0) {
    //             setCanGoForward(true);
    //         } else {
    //             setCanGoForward(false);
    //         }
    //     })
    // }
    

    useEffect(() => {
        getSelectedPayment(id).then((result) => {
            console.log(result);
            setReservationData(result);
            setReservationId(result.reservationId);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setType(result.type);
            setDetails(result.details);
            setPrice(result.price);
            setTime(result.time);
            setDate(result.date);
        });
    }, []);

    

    const onReset = () => {
        getSelectedPayment(id).then((result) => {
            console.log(result);
            setReservationData(result);
            setReservationId(result.reservationId);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setType(result.type);
            setDetails(result.details);
            setPrice(result.price);
            setTime(result.time);
            setDate(result.date);
        });
    }

    const onEditFeedback = () => {
        if (customerName == "" && type == "" && price =="") {
            swal("Please fill the form to add a payment")
        } else if (customerName == "") {
            swal("Please select a customer")
        }else if (type == "") {
            swal("Please select a payment type")
        }else if (price == "") {
            swal("Please enter the amount for the payment")
        }else if (isNaN(price)) {
            swal("Please enter a valid amount for the payment")
        } else {
            const newItem = {
                reservationId: reservationId,
                customerName: customerName,
                phoneNumber: phoneNumber,
                type: type,
                details: details,
                price: price,
                date: date, 
                time: time      
            }
            editPayment(newItem, id)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Payment updated successfully",
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

    return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

						<div class="header">
							<h1 class="header-title mt-1">
								Customer Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">ADD NEW FEEDBACK</h5>
                                    </div>

                                    <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-6">
                                                <label for="name">Full Name</label>
                                                <input type="text" class="form-control" name="name" 
                                                onChange={(e) => setName(e.target.value)} value={name} />
                                            </div>
                                            
                                        </div>

                                    <div class="row px-4 mb-2">
                                        {/* <div class="mb-3 col-md-6">
                                            <label for="roomCode">Room Code</label>
                                            <input type="text" class="form-control"name="roomCode" 
                                            onChange={onChangeCode} value={roomCode}/>
                                        </div> */}
                                        
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">Phone Number</label>
                                            <input type="text" class="form-control"name="phoneNumber" 
                                            onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                                        </div>

                                        <div class="mb-3 col-md-6">
                                            <label for="email">Email</label>
                                            <input type="text" class="form-control"name="email" 
                                            onChange={(e) => setEmail(e.target.value)} value={email}/>
                                        </div>

                                        <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="zipCode">Check In Date</label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={() => {setStartDate(date); checkForAvailableRooms(roomType); setRoom("");}}
                                                className="form-control"
                                                
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

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-12">
                                                <label for="price">Your Comments</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                onChange={(e) => setComment(e.target.value)} value={Comment}></textarea>
                                            </div>
                                            
                                        </div>  
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onEditFeedback}>Add</button>
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} 
                                                onClick={onReset} >Reset</button>
                                        </div>
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

