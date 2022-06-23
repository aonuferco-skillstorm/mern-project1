import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from './components/Navbar/Navbar';
import { FlightList } from './components/FlightList/FlightList';
import { EditFlight } from './components/EditFlight/EditFlight';
import { CreateFlight } from './components/CreateFlight/CreateFlight';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element= {<FlightList />} />
          <Route path="/edit/:id" element= {<EditFlight />} />
          <Route path="/create" element= {<CreateFlight />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
