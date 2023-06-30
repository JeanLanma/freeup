function getHotelById(hotel_id){
    return  'SELECT *'+
            ' FROM hotels h'+
            ' WHERE h.id = ' + hotel_id +
            ' LIMIT 1'; 
}

function getHotelByName(hotel_name){
    return  'SELECT *'+
            ' FROM hotels h'+
            ' WHERE h.name = \'' + hotel_name.toLowerCase() + '\'' +
            ' LIMIT 1'; 
}

function getHotelsByZoneId(zone_id){
    return  'SELECT *'+
            ' FROM hotels h'+
            ' WHERE h.zone_id = ' + zone_id; 
}

function getHotelsByZoneAlias(zone_alias){
    return  'SELECT *'+
            ' FROM hotels h'+
            ' INNER JOIN zones z ON z.id = h.zone_id'+
            ' WHERE z.alias = \'' + zone_alias.toLowerCase() + '\''; 
}

function getHotelsByZoneName(zone_name){
    return  'SELECT *'+
            ' FROM hotels h'+
            ' INNER JOIN zones z ON z.id = h.zone_id'+
            ' WHERE z.name = \'' + zone_name.toLowerCase() + '\''; 
}

module.exports = {
    getHotelById,
    getHotelByName,
    getHotelsByZoneId,
    getHotelsByZoneAlias,
    getHotelsByZoneName
};