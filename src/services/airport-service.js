const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            //console.log(error);
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirportbyid(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirport(id) {
    try {
        const airport= await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError('Invalid attributes provided', error.statusCode)
        }
        else if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Not able to find the resource, entered id is invalid', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirportbyid,
    destroyAirport,
    updateAirport
}