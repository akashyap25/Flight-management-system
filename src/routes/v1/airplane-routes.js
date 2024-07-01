const express = require('express');

const { AirplaneController } = require('../../controllers');
const router = express.Router();
const {AirplaneMiddleware} = require('../../middlewares')


// /api/v1/airplanes POST
router.post('/',
            AirplaneMiddleware.validateCreateRequest,    
            AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/',
            AirplaneController.getAirplanes
);
// /api/v1/airplanes/:id GET

router.get('/:id',
                AirplaneController.getAirplanebyid
)
// api/v1/airplanes/:id DELETE
router.delete('/:id',
                AirplaneController.destroyAirplane
)
router.patch('/',
                AirplaneController.updateAirplane
)

module.exports = router;