function isset(variable){
    return typeof variable !== typeof undefined ? true : false;
}

function empty(variable){
    return variable === '' ? true : false;
}

function isValidZoneAlias(zone_alias){

    const availableZones = ['c','rm','pdc'];

    if(!isset(zone_alias) || empty(zone_alias)){
        return false;
    }

    return availableZones.includes(zone_alias);
}

function isValidPickupTime(pickup_time){

    // make sure pickup_time is formatted as HH:MM
    if(!isset(pickup_time) || empty(pickup_time)){
        return false;
    }

    const regex = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');
    return regex.test(pickup_time);
}

async function validateUpsertRequest(req, res, next){

    const errors = [];

    if(!isset(req.query.hotel_name) || empty(req.query.hotel_name)){
        errors.push('hotel_name is required');
    }

    if(!isset(req.query.tour_name) || empty(req.query.tour_name)){
        errors.push('tour_name is required');
    }

    if(isValidZoneAlias(req.query.zone_alias) === false){
        errors.push('zone_alias is required and must be one of the following: c, rm, pdc');
    }

    if(isValidPickupTime(req.query.pickup_time) === false){
        errors.push('pickup_time is required and must be formatted as HH:MM i.e. 00:00');
    }

    if(errors.length > 0){
        return res.status(400).json({errors});
    }

    return true;
}

module.exports = {
    validateUpsertRequest
}