const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            //console.log(error);
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(){
    try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplanebyid(id){
    try{
        const airplane = await airplaneRepository.get(id);
        return airplane;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirplane(id){
    try{
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    }catch(error){
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try{
        const airplane = await airplaneRepository.update(id,data);
        return airplane;
    }catch(error){
        if (error.statusCode == StatusCodes.BAD_REQUEST ){
            throw new AppError('Invalid attributes provided', error.statusCode)
        }
        else if (error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource, entered id is invalid', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplane,
    getAirplanebyid,
    destroyAirplane,
    updateAirplane
}