const router = require('express').Router();
let Flight = require('../models/flight.model');

router.route('/').get((req, res) => {
    Flight.find()
        .then(flights => res.json(flights))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const flightNumber = req.body.flightNumber;
    const departureDate = Date.parse(req.body.departureDate);
    const arrivalDate = Date.parse(req.body.arrivalDate);
    const departureAirport = req.body.departureAirport;
    const arrivalAirport = req.body.arrivalAirport;
    const currentPassengerNumber = Number(req.body.currentPassengerNumber);
    const passengerLimit = Number(req.body.passengerLimit);

    const newFlight = new Flight({
        flightNumber,
        departureDate,
        arrivalDate,
        departureAirport,
        arrivalAirport,
        currentPassengerNumber,
        passengerLimit
    });

    newFlight.save()
        .then(() => res.json('Flight added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Flight.findById(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Flight.findByIdAndDelete(req.params.id)
        .then(() => res.json('Flight deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Flight.findById(req.params.id)
        .then(flight => {
            flight.flightNumber = req.body.flightNumber;
            flight.departureDate = Date.parse(req.body.departureDate);
            flight.arrivalDate = Date.parse(req.body.arrivalDate);
            flight.departureAirport = req.body.departureAirport;
            flight.arrivalAirport = req.body.arrivalAirport;
            flight.currentPassengerNumber = Number(req.body.currentPassengerNumber);
            flight.passengerLimit = Number(req.body.passengerLimit);
            

            flight.save()
                .then(() => res.json('Flight updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;