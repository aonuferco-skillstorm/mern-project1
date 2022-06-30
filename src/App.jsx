import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'mdb-ui-kit/css/mdb.min.css';
import background from './bg.jpg';

import { Navbar } from './components/Navbar/Navbar';
import { FlightList } from './components/FlightList/FlightList';
import { EditFlight } from './components/EditFlight/EditFlight';
import { CreateFlight } from './components/CreateFlight/CreateFlight';
import { Error } from './components/Error/Error';


function App() {
  return (
    <BrowserRouter>
        <div className="container-fluid" style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'}}>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element= {<FlightList />} />
          <Route path="/edit/:id" element= {<EditFlight />} />
          <Route path="/create" element= {<CreateFlight />} />
          <Route path="*" element={<Error />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
