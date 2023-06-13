const statementQueryService = require('../services/query/statements')
const pcikupModel = require('../models/pickup')
async function test(req, res){
    res.send({sql: 'Hello from the pickupController'});
}
async function makeUpdateSqlStatement(req, res){
    const {pickup_time, hotel_name, zone_alias, tour_name} = req.query;
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
    const {hotel_name, zone_alias, tour_name} = req.query;
    const queryGenerated = statementQueryService.getQueryStatement(hotel_name, zone_alias, tour_name);
    try {
        const result = await pcikupModel.getPickUp(queryGenerated);
        res.send({query: queryGenerated, result: result});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un error al realizar la consulta', queryGenerated });
    }
}

module.exports = {
    test,
    makeUpdateSqlStatement,
    makeSelectSqlStatement
}