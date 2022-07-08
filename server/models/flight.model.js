const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema Template (e.g.
    "flightNumber": "USP0789",
    "departureDate": "2022-07-06T23:43:00.000Z",
    "arrivalDate": "2022-07-07T23:44:00.000Z",
    "departureAirport": "KLD",
    "arrivalAirport": "ERW",
    "currentPassengerNumber": 10,
    "passengerLimit": 11
    )
*/

const flightSchema = new Schema( {
    flightNumber: { type: String, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    currentPassengerNumber: { type: Number, required: true },
    passengerLimit: { type: Number, required: true }
}, {
    timestamps: true,
});

const Flights = mongoose.model('Flights', flightSchema);
module.exports = Flights;
