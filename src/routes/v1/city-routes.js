const express = require('express');

const { CityController} = require('../../controllers');
const { CityMiddleware } = require('../../middlewares')
const router = express.Router();


// /api/v1/cities POST
router.post('/',
            CityMiddleware.validateCreateRequest,
            CityController.createCity
    );

// /api/v1/cities DELETE 

router.delete('/:id',
                CityController.destroyCity
)

router.patch('/',
                CityController.updateCity
)

module.exports = router;