const { StatusCodes } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            //console.log(error);
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the Cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError('Invalid attributes provided', error.statusCode)
        }
        else if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Not able to find the resource, entered id is invalid', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of all the Cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity, 
    destroyCity,
    updateCity
}
