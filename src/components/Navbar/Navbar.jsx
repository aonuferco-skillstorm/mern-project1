import React from 'react';
import { Link }  from 'react-router-dom';

export  const  Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{padding: "1em 1.5em"}}>
            <Link to="/" className="navbar-brand">FlightTracker &#128747;</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Flights</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create a Flight Entry</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
} 