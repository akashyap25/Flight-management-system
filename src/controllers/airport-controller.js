
const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common')
/**
 * 
 * POST : /airplorts
 * req-body : {name: 'IGI',code:'DEL',city_id :4}
 */


async function createAirport(req, res) {
    try {
        // console.log(req.body);
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address : req.body.address,
            city_id : req.body.city_id
        });
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirport();
        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirportbyid(req, res) {
    try {
        //why param? because it is a url param input.....
        const airports = await AirportService.getAirportbyid(req.params.id);
        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.body.id, req.body);
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirportbyid,
    destroyAirport,
    updateAirport
}