
const { StatusCodes } = require('http-status-codes');
const { AirplaneService} = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common')
/**
 * 
 * POST : /airplanes
 * req-body : {modelNumber: 'airbus320',capacity:200}
 */


async function createAirplane(req,res){
    try{
        // console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplanes(req, res){
    try{
        const airplanes =  await AirplaneService.getAirplane();
        SuccessResponse.data = airplanes;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplanebyid(req,res){
    try{
        //why param? because it is a url param input.....
        const airplanes = await AirplaneService.getAirplanebyid(req.params.id);
        SuccessResponse.data = airplanes;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyAirplane(req,res){
    try{
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
            .status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req,res){
    try{
        const airplane = await AirplaneService.updateAirplane(req.body.id,req.body);
        SuccessResponse.data = airplane;
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
     createAirplane,
     getAirplanes,
     getAirplanebyid,
     destroyAirplane,
     updateAirplane
}