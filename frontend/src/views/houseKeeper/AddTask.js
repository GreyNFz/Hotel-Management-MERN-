import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import 'moment-timezone';

import {assignTask, getAvailableHouseKeepers} from '../../controllers/houseKeeper.js';
import {getAvailableRooms, getSelectedTypeAvailableRooms} from '../../controllers/room.js';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AddTask() {

    const [houseKeeperId, setHouseKeeperId] = useState("");
    const [houseKeeperName, setHouseKeeperName] = useState("");
    const [dateT, setDate] = useState("");
    const [room, setRoom] = useState("");
    const [tasks, setTasks] = useState("");
    const [houseKeeperList, setHouseKeeperList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    const today = new Date();

    useEffect(() => {
        getAvailableRooms().then((result) => {
			console.log(result)
			let rooms = [];
			for (let item of result) {
				rooms.push({ value: item.name, label: item.name })
			}
			rooms.push({ value: "Hall A", label: "Hall A" })
			rooms.push({ value: "Hall B", label: "Hall B" })
			rooms.push({ value: "Outdoor", label: "Outdoor" })
			setRoomList(rooms);
			// avaiableRooms.push(result);
        });
    }, [])

    const onAddTask = () => {
        if (houseKeeperName == "" && dateT == "" && room == "" ) {
            swal("Please fill the from to proceed")
        } else if (dateT == "") {
            swal("Please select a date")
        } else if (houseKeeperName == "") {
            swal("Please enter a houseKeeper")
        } else {   
            let newItem = {
                houseKeeperId: houseKeeperId,
                houseKeeperName: houseKeeperName,
                date: formatDate(dateT),
                room: room,
                tasks: tasks,
                assignedDate: formatDate(new Date())
            }
            console.log(newItem);
            assignTask(newItem)
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
        setHouseKeeperId("");
        setHouseKeeperName("");
        setDate(new Date());
        setRoom("");
        setTasks("");
    }

    const formatDate = (date) => {
        if (!date) {return ''}
        let [y,m,d] = [date.getFullYear(), date.getMonth(), date.getDate()];
        m += 1;
        if (m<10) 
            m = "0" + m
        if (d<10)
            d = "0" + d
        return(`${y}-${m+1}-${d}`)
    }

    const onChangeDate = async (date) => {
        setDate(date);
        // let dateMoment = Moment.utc();
        console.log(formatDate(date));
        await getAvailableHouseKeepers(formatDate(date)).then((res)  => {
            console.log(res);
            let keepers = [];
            for (let item of res) {
                keepers.push({ value: item._id, label: item.name })
            }
            setHouseKeeperList(keepers);
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
								HouseKeepers Management
							</h1>
						</div>
						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Assign Task</h5>
                                    </div>
                                    <div class="row px-4 mb-2">
                                    <div class="mb-3 col-md-6">
                                            <label for="zipCode">Date</label>
                                            <DatePicker
                                                utcOffset={0}
                                                onChange={(date:Date) => {onChangeDate(date); setHouseKeeperName(""); setHouseKeeperId("")}}
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
                                            <label for="type">HouseKeeper</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={houseKeeperList}
                                            onChange={((e) => {setHouseKeeperName(e.label); setHouseKeeperId(e.value)})}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Room</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={roomList}
                                            onChange={((e) => {setRoom(e.value)})}
                                            />
                                        </div>
                                    </div>
                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="details">Tasks (Optional)</label>
                                            <textarea class="form-control" id="details" rows="3"
                                            onChange={(e) => setTasks(e.target.value)} value={tasks}></textarea>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddTask}>Add</button>
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

