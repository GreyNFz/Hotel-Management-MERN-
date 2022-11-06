import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import C_M_Dashboard from './views/reservation/Reservation_Dashboard';
import AddRoom from './views/room/AddRoom'
import RoomList from './views/room/RoomList.js'
import EditRoom from './views/room/EditRoom.js'
import ViewRoom from './views/room/ViewRoom.js'

import AddReservation from './views/reservation/AddReservation.js';
import ReservationList from './views/reservation/ReservationList.js';
import ViewReservation from './views/reservation/ViewReservation.js';
import EditReservation from './views/reservation/EditReservation.js';

import AddHouseKeeper from './views/houseKeeper/AddHouseKeeper.js';
import HouseKeeperList from './views/houseKeeper/HouseKeeperList.js';
import ViewHouseKeeper from './views/houseKeeper/ViewHouseKeeper.js';
import EditHouseKeeper from './views/houseKeeper/EditHouseKeeper.js';

import AddPayment from './views/payment/AddPayment.js';
import PaymentList from './views/payment/PaymentList.js';
import ViewPayment from './views/payment/ViewPayment.js';
import EditPayment from './views/payment/EditPayment.js';

import AddVehicle from './views/vehicle/AddVehicle.js'
import ViewVehicle from './views/vehicle/ViewVehicle.js';
import VehicleList from './views/vehicle/VehicleList.js';
import EditVehicle from './views/vehicle/EditVehicle.js';

import AddEvent from './views/event/AddEvent.js';
import EventList from './views/event/EventList.js';
import ViewEvent from './views/event/ViewEvent.js';
import EditEvent from './views/event/EditEvent.js';

import AddFeedback from './views/feedback/addFeedback.js';
import ViewFeedback from './views/feedback/ViewFeedback.js';
import EditFeedback from './views/feedback/editFeedback.js';
import FeddbackList from './views/feedback/feedbackList';

import AddRevenue from './views/revenue/addRevenue'; 
import EditRevenue from './views/revenue/editRevenue';
import ViewRevenue from './views/revenue/viewRevenue';
import RevenueList from './views/revenue/revenueList';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<AddReservation />} />
        <Route exact path="/addRoom" element={<AddRoom />} />
        <Route exact path="/roomList" element={<RoomList />} />
        <Route exact path="/roomEdit/:id" element={<EditRoom />} />
        <Route exact path="/viewRoom/:id" element={<ViewRoom />} />

        <Route exact path="/addReservation" element={<AddReservation />} />
        <Route exact path="/reservationList" element={<ReservationList />} />
        <Route exact path="/viewReservation/:id" element={<ViewReservation />} />
        <Route exact path="/editReservation/:id" element={<EditReservation />} />

        <Route exact path="/addHouseKeeper" element={<AddHouseKeeper />} />
        <Route exact path="/houseKeeperList" element={<HouseKeeperList/>} />
        <Route exact path="/viewHouseKeeper/:id" element={<ViewHouseKeeper/>} />
        <Route exact path="/editHouseKeeper/:id" element={<EditHouseKeeper/>} />

        <Route exact path="/addPayment" element={<AddPayment/>} />
        <Route exact path="/paymentList" element={<PaymentList/>} />
        <Route exact path="/viewPayment/:id" element={<ViewPayment/>} />
        <Route exact path="/editPayement/:id" element={<EditPayment/>} />

        <Route exact path="/addVehicle" element={<AddVehicle/>} />
        <Route exact path="/vehicleList" element={<VehicleList/>} />
        <Route exact path="/viewVehicle/:id" element={<ViewVehicle/>} />
        <Route exact path="/editVehicle/:id" element={<EditVehicle/>} />

        <Route exact path="/addEvent" element={<AddEvent/>} />
        <Route exact path="/eventList" element={<EventList/>} />
        <Route exact path="/viewEvent/:id" element={<ViewEvent/>} />
        <Route exact path="/editEvent/:id" element={<EditEvent/>} />

        <Route exact path="/addFeedback" element={<AddFeedback/>} />
        <Route exact path="/ViewFeedback/:id" element={<ViewFeedback/>} />
        <Route exact path="/editFeedback/:id" element={<EditFeedback/>} />
        <Route exact path="/feedbackList" element={<FeddbackList/>} />

        <Route exact path="/addRevenue" element={<AddRevenue/>} />
        <Route exact path="/editRevenue/:id" element={<EditRevenue />} />
        <Route exact path="/viewRevenue/:id" element={<ViewRevenue />} />
        <Route exact path="/revenueList" element={<RevenueList />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
