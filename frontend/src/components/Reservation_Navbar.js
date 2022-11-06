import React from 'react';
import { Link } from 'react-router-dom';
// import  '../App.css';

// import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd} from 'react-icons/bi';

export default function Reservation_Navbar() {
    return (
        <nav id="sidebar" class="sidebar">

            <Link to='/' class="sidebar-brand" > <img style={{ maxWidth: 50 }} src={require('../img/logo/logo.png')} /> DOUBLE MANGO </Link>

            <div class="sidebar-content">
                <div class="sidebar-user">
                    <div> <Link to='/'> <img src={require('../img/avatars/avatar.jpg')} class="img-fluid rounded-circle mb-2" /></Link></div>
                    <div class="fw-bold">Kaumadi Onel</div>
                    <small>Human Resource Manager</small>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>

                <ul class="sidebar-nav">
                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Dashboards</span>
                        </Link>

                    </li>

                    <li class="sidebar-item ">
                        <a data-bs-target="#customer" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-user-friends"></i> <span class="align-middle">Reservations</span>
                        </a>
                        <ul id="customer" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/addReservation' class="sidebar-link" >Add Reservation</Link></li>
                            <li class="sidebar-item"><Link to='/reservationList' class="sidebar-link" >Reservation List</Link></li>
                            <li class="sidebar-item"><Link to='/reportReservation' class="sidebar-link" >Report</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#sim" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-file-download"></i> <span class="align-middle">Rooms</span>
                        </a>
                        <ul id="sim" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/addRoom' class="sidebar-link" >Add Room</Link></li>
                            <li class="sidebar-item"><Link to='/roomList' class="sidebar-link" >Room List</Link></li>
                            <li class="sidebar-item"><Link to='/reportRoom' class="sidebar-link" >Report</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#package" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-bookmark"></i> <span class="align-middle">House Keeper</span>
                        </a>
                        <ul id="package" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/addHouseKeeper' class="sidebar-link" >Add House Keeper</Link></li>
                            <li class="sidebar-item"><Link to='/houseKeeperList' class="sidebar-link" >House Keeper List</Link></li>
                            <li class="sidebar-item"><Link to='/addTask' class="sidebar-link" >Assign tasks</Link></li>
                            <li class="sidebar-item"><Link to='/reportHouseKeeper' class="sidebar-link" >Report</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#payment" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-receipt"></i> <span class="align-middle">Payments</span>
                        </a>
                        <ul id="payment" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                        <li class="sidebar-item"><Link to='/addPayment' class="sidebar-link" >Add Payments</Link></li>
                            <li class="sidebar-item"><Link to='/paymentList' class="sidebar-link" >Payment List</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#transport" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-user"></i> <span class="align-middle">Transport</span>
                        </a>
                        <ul id="transport" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/addVehicle' class="sidebar-link" >Add Vehicle</Link></li>
                            <li class="sidebar-item"><Link to='/vehicleList' class="sidebar-link" >Vehicle List</Link></li>
                            <li class="sidebar-item"><Link to='/assignVehicle' class="sidebar-link" >Assign vehicle</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#event" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-receipt"></i> <span class="align-middle">Events</span>
                        </a>
                        <ul id="event" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                        <li class="sidebar-item"><Link to='/addEvent' class="sidebar-link" >Add Events</Link></li>
                            <li class="sidebar-item"><Link to='/eventList' class="sidebar-link" >Event List</Link></li>
                        </ul>
                    </li>





                </ul>
            </div>
        </nav>
    )
}




