const Flight = require('../models/flight.model');

// Get list of all flights from the database
const findAllFlights = async () => {
    const flights = await Flight.find();
    return flights;
}

// Add a flight with the request body as the parameters
const createFlight = async ({
    flightNumber,
    departureDate,
    arrivalDate,
    departureAirport,
    arrivalAirport,
    currentPassengerNumber,
    passengerLimit
    }) => {
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureAirport,
            arrivalAirport,
            currentPassengerNumber,
            passengerLimit
        });

        await flight.save();
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

// Find a flight by a specific ID (param)
const findFlightById = async (id) => {
    try {
        const flight = await Flight.findById(id);
        if (flight == null) {
            throw `No flight with the id of ${id} found`;
        }
        return flight;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err };
    }
}

// Delete a flight by a specific ID (param)
const deleteFlightById = async (id) => {
    try {
        await Flight.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

// Update a flight by a specific ID (param), taking request body as new values for the flight
const updateFlightById = async (id, { flightNumber,
                                    departureDate,
                                    arrivalDate,
                                    departureAirport,
                                    arrivalAirport,
                                    currentPassengerNumber,
                                    passengerLimit 
    }) => {
    try {
        const flight = await Flight.findById(id);
        flight.flightNumber = flightNumber;
        flight.departureDate = Date.parse(departureDate);
        flight.arrivalDate = Date.parse(arrivalDate);
        flight.departureAirport = departureAirport;
        flight.arrivalAirport = arrivalAirport;
        flight.currentPassengerNumber = Number(currentPassengerNumber);
        flight.passengerLimit = Number(passengerLimit);

        await flight.save();
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

module.exports = { findAllFlights, createFlight, findFlightById, deleteFlightById, updateFlightById };