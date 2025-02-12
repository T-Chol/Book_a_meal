import React from 'react';
// import { Link } from 'react-router-dom';
import './Header.css'; // Import the Header CSS
import Link from 'next/link';

function AuthHeader({ handleLogout, isLoggedIn, user }) {
return (

    <div className="  border-b-2 shadow-inner hover:shadow-teal-600 h-20 flex justify-between  items-center">
    {/* Add hotel logo */}
    <Link className=" align-items-center  " href="/landingPage">
        <img
        src="./logo.jpeg" // Replace with your logo's path
        alt="Logo"
        className="hotel-logo "
        />
    </Link>
    <ul className=" navbar-nav flex ml-auto">
    <li className="nav-item">
            <Link className="nav-link " href="/landingPage">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" href="/menu">Menu</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" href="/about">About Us</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" href="/team">Team</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" href="/specials">Today's Specials</Link>
        </li>
        
    </ul>


    <ul className="ms-auto flex">


</ul>

    </div>

);
}

export default AuthHeader;
