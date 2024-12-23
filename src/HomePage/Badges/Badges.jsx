import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './HomePage/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './HomePage/Dashboard';
import Employee from './HomePage/Employee';
import EmployeeDetails from "./EmployeeComponents/EmployeeDetails";
import TokenExpirationCheck from './Components/TokenExpirationCheck';
import Contacts from './HomePage/MyContacts/Contacts';
import NewContacts from './HomePage/MyContacts/NewContacts';
import UpdateContacts from './HomePage/MyContacts/UpdateContacts';
import ContactsDetails from './HomePage/MyContacts/ContactsDetails';
import AssignedTasks from './HomePage/Tasks/AssignedTasks';
import MyTasks from './HomePage/Tasks/MyTasks';
import EmployeesList from './HomePage/Tasks/EmployeesList';
import GivenBadges from './HomePage/Badges/GivenBadges';
import OtherEmployeesList from './HomePage/Badges/OtherEmployeesList';
import Badges from './HomePage/Badges/Badges';
import RecievedBadges from './HomePage/Badges/RecievedBadges';

// import { jwtDecode } from 'jwt-decode';
// import  { useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';

function App() {



    const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('role');





    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
                {/* Redirect to login if not logged in */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/*" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

function Main() {
    const location = useLocation();
    const showNavbar = !['/login', '/register'].includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            <TokenExpirationCheck/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                {/* Add more routes as needed */}
                <Route path="/employeedetails/:employeeId" element={<EmployeeDetails />} />
                <Route path="/Contacts" element={<Contacts/>} />
                <Route path='/NewContacts' element={<NewContacts/>}/>
                <Route path='/ContactsDetails/:contactId' element={<ContactsDetails/>}/>
                <Route path='/UpdateContacts/:contactId' element={<UpdateContacts/>}/>
                <Route path="/AssignedTasks" element={<AssignedTasks/>} />
                <Route path="/MyTasks" element={<MyTasks/>} />
                <Route path='/CreateTask' element={<EmployeesList/>}/>
                <Route path='/GivenBadges' element={<GivenBadges/>}/>
                <Route path='/RecievedBadges' element={<RecievedBadges/>}/>
                <Route path='/Badges' element={<Badges/>}/>
                <Route path='/OtherEmployeesList' element={<OtherEmployeesList/>}/>
            </Routes>
        </>
    );
}

export default App;



