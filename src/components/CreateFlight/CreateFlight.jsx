import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';


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

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            console.log(flight);
            await axios.post('http://localhost:5000/flights/add', flight)
                .then(res => console.log(res.data));
        } catch (error) {
            console.log('Something went wrong during database transmission');
        }
    }

    const changeHandler = e => {
        setFlight({...flight, [e.target.name]: e.target.value})
    }

    return (
    <div>
      <h3>Create New Flight Entry</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
        <label>FLIGHT #  </label>
          <input  type="text"
              required
              className="form-control"
              name="flightNumber"
              value={flight.flightNumber}
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
            min={new Date().toISOString().slice(0, -8)}
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
              value={flight.currentPassengerNumber}
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