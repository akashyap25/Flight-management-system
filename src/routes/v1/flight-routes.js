const express = require('express');

const { FlightController } = require('../../controllers');
const router = express.Router();
const { FlightMiddlewares } = require('../../middlewares')


// /api/v1/airplanes POST
router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);

router.get('/',
    FlightController.getAllFlights);

router.get('/:id',
    FlightController.getFlightbyid);

router.patch('/:id/seats',
                FlightMiddlewares.validateUpdateSeatsRequest,
                FlightController.updateSeats
                );

module.exports = router;