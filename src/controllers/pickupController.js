const statementQueryService = require('../services/query/statements')
const pcikupModel = require('../models/pickup')
const { usePrepareGetParams, formatPickupTime, usePrepareUpdateParams } = require('../services/utils');
const { validateUpsertRequest } = require('../services/validators/upsertRequest');

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

    validateUpsertRequest(req, res);

    const {hotel_name, zone_alias, tour_name} = usePrepareGetParams(req.query);
    const pickup_time = formatPickupTime(req.query.pickup_time);

    let queryGenerated = statementQueryService.getQueryStatement(hotel_name, zone_alias, tour_name);
    try {
        let result = await pcikupModel.getPickUp(queryGenerated);
        
        if(result.length == 0){
            return res.status(404).send({ error: 'No se encontro ningun resultado', queryGenerated });
        }

        if(result[0].pickup_time.slice(0,5) == pickup_time){
            res.send({msessage: 'No se realizo ningun cambio', queryGenerated, result});
            return;
        }

        queryGenerated = statementQueryService.updateQueryStatement(pickup_time, hotel_name, zone_alias, tour_name);
        result = await pcikupModel.updatePickup(queryGenerated);
        res.send({message: 'Cambios realizados correctamte', queryGenerated, result});
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consulta', queryGenerated });
    }
}

module.exports = {
    test,
    makeUpdateSqlStatement,
    makeSelectSqlStatement,
    makeUpsertSqlStatement,
}