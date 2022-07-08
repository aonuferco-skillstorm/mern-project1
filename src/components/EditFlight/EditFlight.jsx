import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditFlight.css';

export const  EditFlight = (props) => {

  const [flight, setFlight] = useState({
    flightNumber : '',
    departureDate : '',
    arrivalDate : '',
    departureAirport : '',
    arrivalAirport : '',
    currentPassengerNumber : 0,
    passengerLimit : 0
  });

  const { id } = useParams();

  // componentDidMount;
  // Used to retrieve the selected flight and set the inputs fields with its values
  // Axios GET by Id
  useEffect(() => {
    axios.get('http://localhost:5000/flights/'+ id)
        .then(response => {
          setFlight({
            flightNumber : response.data.flightNumber,
            departureDate : response.data.departureDate.slice(0, -8),
            arrivalDate : response.data.arrivalDate.slice(0, -8),
            departureAirport : response.data.departureAirport,
            arrivalAirport : response.data.arrivalAirport,
            currentPassengerNumber : response.data.currentPassengerNumber,
            passengerLimit : response.data.passengerLimit
          })
        })
        .catch((error) => {
          console.log(error);
        });

  }, []);

  // Handler to set changed values from the input fields
  const changeHandler = e => {
    setFlight({...flight, [e.target.name]: e.target.value})
  }

  // Main submit function of the form
  // Submits the changed data to the database
  // Axios POST updateById request 
  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
        console.log(flight);

        axios.post('http://localhost:5000/flights/update/' + id, flight)
          .then(response  => console.log(response.data));

        window.location = '/';
    } catch (error) {
        console.log('Something went wrong during database update');
    }
}

  // Form component, having the current values of the selected flight
  return (
  <div>
    <h2 className='text-center' style={{ marginBottom: '25px'}}>Edit Flight Entry</h2>
    <form className='form-horizontal' onSubmit={onSubmit}>
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
          min={flight.departureDate}
          value={flight.departureDate}
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
          min={flight.departureDate}
          value={flight.arrivalDate}
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
            max={flight.passengerLimit}
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
        <input type="submit" value="Edit Flight Log" className="btn btn-primary" />
      </div>
    </form>
  </div>
  );
} 