import React, { useState } from 'react';
import axios from 'axios';
import './CreateFlight.css';


export const  CreateFlight = () => {

  const [flight, setFlight] = useState({
      flightNumber : '',
      departureDate : '',
      arrivalDate : '',
      departureAirport : '',
      arrivalAirport : '',
      currentPassengerNumber : 0,
      passengerLimit : 0
  });

  // Main function, submitting a new flight entry to the database
  // Axios POST request
  const onSubmit = async (event) => {
      event.preventDefault();
      
      try {
          console.log(flight);
          await axios.post('http://localhost:5000/flights/add', flight)
              .then(res => console.log(res.data));
          window.location = '/';
      } catch (error) {
          console.log('Something went wrong during database transmission');
      }
  }

  // Handler to set changed values from the input fields
  const changeHandler = e => {
      setFlight({...flight, [e.target.name]: e.target.value})
  }

  // Form component for a new flight entry
  return (
  <div>
    <h2 className='text-center' style={{ marginBottom: '25px'}}>Create New Flight Entry</h2>
    <form className='form-horizontal' onSubmit={onSubmit}>
      <div className="form-group"> 
      <label>FLIGHT #  </label>
        <input  type="text"
            required
            className="form-control"
            name="flightNumber"
            value={flight.flightNumber}
            placeholder='Example: OKL049'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group">
        <label>DEPARTURE DATE &amp; TIME: </label>
        <div>
        <input type="datetime-local"
          name="departureDate" 
          min={new Date().toISOString().slice(0, -8)}
          required
          onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group">
        <label>ARRIVAL DATE &amp; TIME: </label>
        <div>
        <input type="datetime-local" id="meeting-time"
          name="arrivalDate" 
          min={flight.departureDate.length > 0 ? flight.departureDate : new Date().toISOString().slice(0, -8)}
          required
          onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group"> 
      <label>DEPARTURE AIRPORT  </label>
        <input  type="text"
            required
            className="form-control"
            name="departureAirport"
            value={flight.departureAirport}
            placeholder='Example: PDX'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group"> 
      <label>ARRIVAL AIRPORT  </label>
        <input  type="text"
            required
            className="form-control"
            name="arrivalAirport"
            value={flight.arrivalAirport}
            placeholder='Example: PDX'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group"> 
      <label>CURRENT PAX #  </label>
        <input  type="number"
            required
            className="form-control"
            name="currentPassengerNumber"
            min="1"
            max={flight.passengerLimit}
            value={flight.currentPassengerNumber}
            placeholder='Example: 10'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group"> 
      <label>MAX PAX #  </label>
        <input  type="number"
            required
            className="form-control"
            name="passengerLimit"
            min="1"
            value={flight.passengerLimit}
            placeholder='Example: 10'
            onChange={changeHandler}
            />
      </div>

      <br />
      <div className="form-group">
        <input type="submit" value="Create Flight Log" className="btn btn-primary" />
      </div>
    </form>
  </div>
  );
} 