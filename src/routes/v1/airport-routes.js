const express = require('express');

const { AirportController } = require('../../controllers');

const { AirportMiddleware } = require('../../middlewares')
const router = express.Router();



// /api/v1/airplanes POST
router.post('/',
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport);

// /api/v1/airplanes GET
router.get('/',
    AirportController.getAirports
);
// /api/v1/airplanes/:id GET

router.get('/:id',
    AirportController.getAirportbyid
)
// api/v1/airplanes/:id DELETE
router.delete('/:id',
    AirportController.destroyAirport
)
router.patch('/',
    AirportController.updateAirport
)

module.exports = router;