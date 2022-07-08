import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Flight subcomponent to display flight information in a row of the table
const Flight = props => (
    <tr>
      <td><b>{props.flight.flightNumber}</b></td>
      <td>{props.flight.departureDate.substring(0,10) + " " + props.flight.departureDate.substring(11,16)}</td>
      <td>{props.flight.arrivalDate.substring(0,10) + " " + props.flight.arrivalDate.substring(11,16)}</td>
      <td  style={{textAlign : "center"}}>{props.flight.departureAirport}</td>
      <td  style={{textAlign : "center"}}>{props.flight.arrivalAirport}</td>
      <td  style={{textAlign : "center"}}>{props.flight.currentPassengerNumber}</td>
      <td  style={{textAlign : "center"}}>{props.flight.passengerLimit}</td>
      <td>
        {/* 
        Link elements for Edit Flight navigation page and deleting a flight from the list
        */}
        <Link to={"/edit/" + props.flight._id} style={{textDecoration: 'none'}}>
          <i style={{fontSize:'24px'}} className="fa">&#xf040;</i>
        </Link> | <a href="#" onClick={() => { props.deleteFlight(props.flight._id) }}>
          <i style={{fontSize:'24px', color: 'red'}} className="fa">&#xf014;</i>
        </a>
      </td>
    </tr>
  )


export const  FlightList = () => {

    const [flights, setFlights] = useState([]);
    
    // componentDidMount; 
    // Initial list returned from Axios GET request
    useEffect( () => {
        axios.get('http://localhost:5000/flights/')
            .then(response => {
                setFlights(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Axios DELETE method, deleting the flight from the list
    // and dynamically updating the list of flights
    const deleteFlight = (id) => {
        axios.delete('http://localhost:5000/flights/' + id)
          .then(response => { console.log(response.data)});

        setFlights(flights.filter( element => element._id !== id));
      }

    // Map of Flight subcomponents for the table
    const flightsList = () => {
        return flights.map(currentFlight => {
            return <Flight flight={currentFlight} deleteFlight={deleteFlight} key={currentFlight._id}/>
          });
    }

    // Main table for the flight list and respective subcomponents
    return (
        <div>
        <h3 className='container'>Logged Flights</h3>
        <table className="table table-hover container" 
          style={{ background: 'rgba(255,255,255, 0.5)'}}>
          <thead className="thead-light">
            <tr>
              <th>FLIGHT #</th>
              <th>DEPARTURE DATE</th>
              <th>ARRIVAL DATE</th>
              <th  style={{textAlign : "center"}}>DEPARTURE AIRPORT</th>
              <th  style={{textAlign : "center"}}>ARRIVAL AIRPORT</th>
              <th  style={{textAlign : "center"}}>CURRENT PAX #</th>
              <th  style={{textAlign : "center"}}>PAX LIMIT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flightsList()}
          </tbody>
        </table>
      </div>
    );
} 