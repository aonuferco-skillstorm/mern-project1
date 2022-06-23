const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
