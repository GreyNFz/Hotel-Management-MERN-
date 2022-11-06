import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import single from '../../img/photos/single.jpg';
import double from '../../img/photos/double.jpg';
import triple from '../../img/photos/triple.jpg';
import queen from '../../img/photos/queen.jpg';
import presidential from '../../img/photos/presidential.jpg';

import {getSelectedHouseKeeper, completeAssignedTask} from '../../controllers/houseKeeper'
import {getAvailableRooms} from '../../controllers/room';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewHouseKeeper() {

    const { id } = useParams();

    const [houseKeeperData, setHouseKeeperData] = useState({});
	// const [avaiableRooms, setAvaiableRooms] = useState([]);
	// const [isAssigningTask, setAssigningTask] = useState(false);
	// const [assignedRoom, setAssignedRoom] = useState("");

    useEffect(() => {
        getSelectedHouseKeeper(id).then((result) => {
        	// console.log(result);
        	setHouseKeeperData(result);
        });
		// getAvailableRooms().then((result) => {
		// 	console.log(result)
		// 	let rooms = [];
		// 	for (let item of result) {
		// 		rooms.push({ value: item.name, label: item.name })
		// 	}
		// 	rooms.push({ value: "Hall A", label: "Hall A" })
		// 	rooms.push({ value: "Hall B", label: "Hall B" })
		// 	rooms.push({ value: "Outdoor", label: "Outdoor" })
		// 	setAvaiableRooms(rooms);
		// 	// avaiableRooms.push(result);
        // });
    }, []);

	// const onAssignTask = async (e) => {
	// 	setAssigningTask(true);
	// 	setAssignedRoom(e.value);
	// }

	// const onSaveAssignTask = async () => {
	// 	completeAssignedTask(houseKeeperData._id, assignedRoom)
    //         .then((result) => {
    //             if (result != undefined) {
    //                 swal({
    //                     title: "Success!",
    //                     text: "Task added successfully",
    //                     icon: 'success',
    //                     timer: 2000,
    //                     button: false,
    //                 })
	// 				.then((reload) => {
	// 					window.location.reload();
	// 				});;
    //             } else {
    //                 swal({
    //                     title: "Error!",
    //                     text: "Something went wrong went wrong. Try again",
    //                     icon: 'error',
    //                     dangerMode: true,
    //                     button: false,
    //                 })
    //             }
    //         })
    //         .catch ((err) => {
    //             swal({
    //                 title: "Error!",
    //                 text: "Something went wrong with the network. Try reloading page",
    //                 icon: 'error',
    //                 dangerMode: true,
    //                 button: true,
    //             })
    //             .then((reload) => {
    //                 window.location.reload();
    //             });
    //         })
	// }

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

						<div class="header">
							<h1 class="header-title mt-1">
								House Keeper Management
							</h1>

						</div>

						<div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/houseKeeperList"}
												class="top-bar-link"
											>
												<button
												class="btn btn-pill btn-success btn-sm"
												style={{ marginLeft:-600, width: 60 }}
												>
												Back
												</button>
											</Link></center>
                                        
										{/* <div class="col-sm-3 col-xl-12 col-xxl-12 text-center">
											<img src={single} class=" mt-2" alt="Angelica Ramos" width="600" height="300"/>
										</div> */}
										<br></br>
                                        <br></br>
									</div>

                                    <div class="row">
                                                <div class="col-md-2"></div>
                                                <div class="col-md-8"><table class="table table-sm my-2 " >
										<tbody>
											<tr>
												<th>Name</th>
												<td>{houseKeeperData.name}</td>
											</tr>
											<tr>
												<th>DOB</th>
												<td>{houseKeeperData.dob}</td>
											</tr>
											<tr>
												<th>Gender</th>
												<td>{houseKeeperData.gender}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{houseKeeperData.mobile}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{houseKeeperData.address}</td>
											</tr>
                                            <tr>
												<th>Joined Date</th>
												<td>{houseKeeperData.joinedDate}</td>
											</tr>
											{/* <br />
											<tr>
												<th>Assign Task</th>
												<td>
													<Select 
														options={avaiableRooms}
														isClearable
                                            			isSearchable
														onChange={onAssignTask}
													/>
												</td>
											</tr> */}
                                            
										</tbody>
									</table></div>
                                                <div class="col-md-2"></div>
                                            </div>


                                            <hr></hr>
                                            
									
								</div>
							</div>
                        </div>

					</div>
				</main>
			</div>
		</div>
	)

}

