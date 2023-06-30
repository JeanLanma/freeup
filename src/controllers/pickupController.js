const statementQueryService = require('../services/query/statements')
const pcikupModel = require('../models/pickup')
const { usePrepareGetParams, formatPickupTime, usePrepareUpdateParams, resultMessage } = require('../services/utils');
const { validateUpsertRequest } = require('../services/validators/upsertRequest');
const { useValidator } = require('../services/validators/validator');
const { getHotelByName } = require('../services/query/hotelsGet');

async function test(req, res){
    const {hotel_name, zone_alias, tour_name} = usePrepareGetParams(req.query);
    res.send({sql: 'Hello from the pickupController ', request: {hotel_name, zone_alias, tour_name}});
}
async function makeUpdateSqlStatement(req, res){
    const {pickup_time, hotel_name, zone_alias, tour_name} = usePrepareUpdateParams(req.query);
    const queryGenerated = statementQueryService.updateQueryStatement(pickup_time, hotel_name, zone_alias, tour_name);
    try {
        const result = await pcikupModel.updatePickup(queryGenerated);
        res.send({queryGenerated, result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consulta', queryGenerated });
    }
}
async function makeSelectSqlStatement(req, res){
    const {hotel_name, zone_alias, tour_name} = usePrepareGetParams(req.query);
    const queryGenerated = statementQueryService.getQueryStatement(hotel_name, zone_alias, tour_name);
    try {
        const result = await pcikupModel.getPickUp(queryGenerated);
        res.send({query: queryGenerated, result: result});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consulta', queryGenerated });
    }
}
async function makeUpsertSqlStatement(req, res){

    // Validating errors
    const requestHasErrors = await validateUpsertRequest(req);
    if(requestHasErrors.length > 0) return res.status(422).send(requestHasErrors);


    // Preparing Get Statement
    const {hotel_name, zone_alias, tour_name} = usePrepareGetParams(req.query);
    const pickup_time = formatPickupTime(req.query.pickup_time);
    let queryGenerated = statementQueryService.getQueryStatement(hotel_name, zone_alias, tour_name);
    try {
        let result = await pcikupModel.getPickUp(queryGenerated);
        
        // Query success, but 0 results found
        if(result.length == 0){
            return res.status(404).send({ error: 'No se encontro ningun resultado', queryGenerated });
        }

        // Query success, results found but pickup_time is the same
        if(result[0].pickup_time.slice(0,5) == pickup_time){
            return res.send({msessage: 'No se realizo ningun cambio', queryGenerated, result});
        }

        // Preparing Update Statement
        queryGenerated = statementQueryService.updateQueryStatement(pickup_time, hotel_name, zone_alias, tour_name);
        result = await pcikupModel.updatePickup(queryGenerated);
        return res.send({message: 'Cambios realizados correctamte', queryGenerated, result});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consulta', queryGenerated });
    }
}

async function makeDetailGetQueryStatement(req, res) {
    const {hotel_name, zone_alias, tour_name} = usePrepareGetParams(req.query);
    const queryGenerated = statementQueryService.getDetailQueryStatement(hotel_name, zone_alias, tour_name);
    try {
        const result = await pcikupModel.getPickUp(queryGenerated);
        res.send({query: queryGenerated, result: result, message: resultMessage(result[0])});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consula', queryGenerated });
    }
}

async function makeInsertPickupStatement(req, res) {

    const hotel = useValidator(req.body.hotel_name, 'Hotel name')
                    .required()
                    .string();

    if(hotel.hasErrors()) return res.status(422).send({errors: hotel.getErrors(), val: hotel.getValue()});

    const queryGenerated = getHotelByName(hotel.getValue());
    const result = await pcikupModel.execute(queryGenerated);
    return res.send({resul: result,queryGenerated, message: 'Todo bien', hotel: hotel.getValue()});
};

module.exports = {
    test,
    makeUpdateSqlStatement,
    makeSelectSqlStatement,
    makeUpsertSqlStatement,
    makeDetailGetQueryStatement,
    makeInsertPickupStatement,
}