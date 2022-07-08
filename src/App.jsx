import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Navbar } from './components/Navbar/Navbar';
import { FlightList } from './components/FlightList/FlightList';
import { EditFlight } from './components/EditFlight/EditFlight';
import { CreateFlight } from './components/CreateFlight/CreateFlight';
import { Error } from './components/Error/Error';


function App() {
  return (
    <BrowserRouter>
        <div>
        <Navbar />
        <br />
        <div className="container-fluid">
          {/*
              Creating routes for components.
              1. Landing page - Table of all flights
              2. Edit flight page
              3. Create flight page
              4. 404 page 
          */}
          <Routes>
            <Route path="/" element= {<FlightList />} />
            <Route path="/edit/:id" element= {<EditFlight />} />
            <Route path="/create" element= {<CreateFlight />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
