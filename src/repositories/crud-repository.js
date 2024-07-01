const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository{
    constructor(model){
        this.model = model;
    }
    async create(data){
            const response = await this.model.create(data);
            return response;
        // catch(error){
        //     Logger.error('Something went wrong in the CRUD Repo : create');
        //     throw error;
        // }
    }
    async destroy(data) {
            const response = await this.model.destroy({
                where:{
                    id : data
                }
            });
            if (!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
            }
            return response;
    }
    async get(data) {
            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response;
        
    }
    async getAll() {
            const response = await this.model.findAll();
            return response;
        
    }
    
    async update(id, data) {
        const isAirplaneUpdate = data.modelNumber && data.capacity;
        const isCityUpdate = data.name;
        const isAirportUpdate =  data.name && data.code && data.city_id;

        if (!isAirplaneUpdate && !isCityUpdate && !isAirportUpdate) {
            throw new AppError('Invalid attributes provided', StatusCodes.BAD_REQUEST);
        }
        if(isAirportUpdate && (!data.code || !data.city_id)) {
            throw new AppError('Invalid attributes for airport provided', StatusCodes.BAD_REQUEST);
        }

        const response = await this.model.update(data, {
            where: {
                id: id
            }
        });

        if (response == 0) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }

        return response;
    }
}

module.exports = CrudRepository; 