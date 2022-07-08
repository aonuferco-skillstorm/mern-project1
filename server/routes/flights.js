const router = require('express').Router();
const { createFlight, findAllFlights, findFlightById, deleteFlightById, updateFlightById } = require('../controllers/flights.controller');

// GET Request (e.g. GET localhost:5000/flights/)
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.status(200).json(flights);
})

// POST Request (e.g. POST localhost:5000/flights/add 
// (requires json from the request body))
router.post('/add', async (req, res) => {
    try {
        await createFlight(req.body);
        res.status(201).json('Flight added');
    } catch (err) {
        res.status(err?.status || 500).json({message: err.message});
    }
})

// GET Request (e.g. GET localhost:5000/flights/62c7473f0f0fb896461178ee)
router.get('/:id', async (req, res) => {
    try {
        const flight = await findFlightById(req.params.id);
        res.json(flight);
    } catch (err) {
        res.status(err?.status || 400).json({message: err.message});
    }
})

// DELETE Request (e.g. DELETE localhost:5000/flights/62c7473f0f0fb896461178ee)
router.delete('/:id', async (req, res) => {
    try {
        await deleteFlightById(req.params.id);
        res.status(200).json('Flight deleted');
    } catch (err) {
        res.status(err?.status || 400).json({message: err.message});
    }
})

// POST Request (e.g. POST localhost:5000/flights/update/62c7473f0f0fb896461178ee 
// (requires ID as param and json from the request body))
router.post('/update/:id', async (req, res) => {
    try {
        await updateFlightById(req.params.id, req.body);
        res.status(200).json('Flight updated');
    } catch (err) {
        res.status(err?.status || 500).json({message: err.message});
    }
})

module.exports = router;