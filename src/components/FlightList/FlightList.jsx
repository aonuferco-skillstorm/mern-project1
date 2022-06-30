import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Flight = props => (
    <tr>
      <td><b>{props.flight.flightNumber}</b></td>
      <td>{props.flight.departureDate.substring(0,10) + " " + props.flight.departureDate.substring(11,16)}</td>
      <td>{props.flight.arrivalDate.substring(0,10) + " " + props.flight.arrivalDate.substring(11,16)}</td>
      <td>{props.flight.departureAirport}</td>
      <td>{props.flight.arrivalAirport}</td>
      <td>{props.flight.currentPassengerNumber}</td>
      <td>{props.flight.passengerLimit}</td>
      <td>
        <Link to={"/edit/"+props.flight._id} style={{textDecoration: 'none'}}>
          <i style={{fontSize:'24px'}} className="fa">&#xf040;</i>
        </Link> | <a href="#" onClick={() => { props.deleteFlight(props.flight._id) }}>
          <i style={{fontSize:'24px', color: 'red'}} className="fa">&#xf014;</i>
        </a>
      </td>
    </tr>
  )


export const  FlightList = () => {

    const [flights, setFlights] = useState([]);
    
    useEffect( () => {
      console.log('useEffect called in CreateFlight');
        axios.get('http://localhost:5000/flights/')
            .then(response => {
                setFlights(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const deleteFlight = (id) => {
        axios.delete('http://localhost:5000/flights/' + id)
          .then(response => { console.log(response.data)});

        setFlights(flights.filter( element => element._id !== id));
      }

    const flightsList = () => {
        return flights.map(currentFlight => {
            return <Flight flight={currentFlight} deleteFlight={deleteFlight} key={currentFlight._id}/>
          });
    }

    return (
        <div>
        <h3>Logged Flights</h3>
        <table className="table table-hover" 
          style={{ background: 'rgba(255,255,255,0.5)'}}>
          <thead className="thead-light">
            <tr>
              <th>FLIGHT #</th>
              <th>DEPARTURE DATE</th>
              <th>ARRIVAL DATE</th>
              <th>DEPARTURE AIRPORT</th>
              <th>ARRIVAL AIRPORT</th>
              <th>CURRENT PAX #</th>
              <th>PAX LIMIT</th>
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