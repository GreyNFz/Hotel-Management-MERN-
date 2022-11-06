import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import {getAllReservations, deleteReservation, getReservationsInAGivenPeriod} from '../../controllers/reservation.js';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import logo from '../../img/logo/logo.png';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function ReportReservation() {

    $("input").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        )
    }).trigger("change")

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate() + 1;
    let year = dateObj.getUTCFullYear()
    let prevMonth = month - 3;
    if (month < 10)
        month = "0" + month;
    if (prevMonth < 10)
        prevMonth = "0" + prevMonth;
    if (day < 10)
        day = "0" + day;
    let initalStartDate = year + "-" + prevMonth + "-" + day;
    let initalEndDate = year + "-" + month + "-" + day;

    const [startDate, setStartDate] = useState(initalStartDate);
    const [endDate, setEndDate] = useState(initalEndDate);

    const [loading, setLoading] = useState(true);

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState(true);

    useEffect(() => {
        setStartDate(initalStartDate);
        setEndDate(initalEndDate);
        appointmentReportGet();
    }, []);

    async function appointmentReportGet() {
        await setLoading(true);
        if (startDate === '') {
            swal("Start date not selected");
        } else if (endDate === '') {
            swal("End date not selected");
        } else {
            setLoading(true);
            getReservationsInAGivenPeriod(new Date(startDate), new Date(endDate)).then((result) => {
                console.log(result);
                setReportList(result);
                setHead(true);
            })
            .catch((err) => {
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
            .then ((result) => {
                result.json()
            })
            .then(json => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
        }
    }

    function downloadPDF() {

        const doc = new jsPDF();
        doc.setDrawColor(15, 52, 96);
        doc.setLineWidth(70);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 98, 4, 17, 10)

        doc.setFontSize('18')
        doc.setTextColor(255,255,255);
        doc.setFont('Helvertica', 'bold')
        doc.text("Reservation Report", 81, 20)
        //
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'Normal')
        doc.text("Report generated on: ", 68, 27)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text(new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString('en-US'), 105, 27)

        doc.setTextColor(0,0,0);
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Report Start Date ", 14, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + startDate, 45, 47)
        
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Report End Date ", 147, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + endDate, 176, 47)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Reservations", 14, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + reportList.length, 45, 55)
        
        doc.autoTable({
            theme: "grid",
            head: [['Customer Name', 'NIC', 'Phone Number', 'Checkin Date', 'Checkout Date', 'Room', 'Total Persons']],
            body: reportList.map(col => [[col.name], [col.nic], [col.phoneNumber], [col.checkInDate.slice(0,10)],
                [col.checkOutDate.slice(0,10)], [col.room], [Number(col.numOfAdults) + Number(col.numOfChildren)]]),
            margin: { top: 65 }
        })
        doc.save('ReservationReport(' + startDate + '-' + endDate + ').pdf')
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
								Reservation Management
							</h1>

						</div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body mt-3 mb-2" style={{ margin: "0px" }} >
                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Select the Start date and End date to generate the report</h5>
                                    </div>

                                    <div class="row  align-items-center px-4 mb-2" >
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">Start Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={startDate} 
                                            onChange={(e) => setStartDate(e.target.value)} defaultValue={initalStartDate} required />
                                        </div>
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">End Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={endDate} 
                                            onChange={(e) => setEndDate(e.target.value)} defaultValue={initalEndDate} required />
                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" 
                                                style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} onClick={() => appointmentReportGet()} 
                                            >Submit</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div>
                            {head === true ? (
                                <button class="btn  btn-primary" style={{ marginBottom: 25 }} onClick={() => downloadPDF()} >Download PDF</button>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {head === true ? (
                            <div class="col-12">
                                <div class="card">

                                    <div class="card-body">

                                        <table id="example" class="table table-striped my">

                                            <thead>
                                                <tr>
                                                    <th class="text-start">Name</th>
                                                    <th class="text-start">NIC</th>
                                                    <th class="text-start">Phone Number</th>
                                                    <th class="text-start">Check In Date</th>
                                                    <th class="text-start">Check Out Date</th>
                                                    <th class="text-start">Room</th>
                                                    <th class="text-start">Total Persons</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {reportList.map((value, index) => {
                                                    return <tr key={index}  id="OrderId">
                                                        <td class="text-start">{value.name}</td>
                                                        <td class="text-center">{value.nic}</td>
                                                        <td class="text-center">{value.phoneNumber}</td>
                                                        <td class="text-center">{value.checkInDate.slice(0,10)}</td>
                                                        <td class="text-center">{value.checkOutDate.slice(0,10)}</td>
                                                        <td class="text-center">{value.room}</td>
                                                        <td class="text-center">{Number(value.numOfAdults) + Number(value.numOfChildren)}</td>
                                                    </tr>
                                                })}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p></p>
                        )}

					</div>
				</main>
			</div>
		</div>
	)

}

