function updateQueryStatement(pickup_time, hotel_name, zone_alias, tour_name) {

    return  'UPDATE pickups p'+
            ' INNER JOIN hotels h ON h.id = p.hotel_id' +
            ' INNER JOIN zones z ON z.id = p.zone_id' +
            ' INNER JOIN activities a ON a.id = p.activity_id' +
            ' SET pickup_time = \'' + pickup_time +  '\'' +
            ' WHERE h.name = \'' + hotel_name + '\'' +
            ' AND z.alias = \'' + zone_alias.toLowerCase() + '\'' +
            ' AND a.name = \'TOUR ' + tour_name.toUpperCase() + '\''; 
}
function getQueryStatement(hotel_name, zone_alias, tour_name) {

    return  'SELECT *'+
            ' FROM pickups p'+
            ' INNER JOIN hotels h ON h.id = p.hotel_id' +
            ' INNER JOIN zones z ON z.id = p.zone_id' +
            ' INNER JOIN activities a ON a.id = p.activity_id' +
            ' WHERE h.name = \'' + hotel_name + '\'' +
            ' AND z.alias = \'' + zone_alias.toLowerCase() + '\'' +
            ' AND a.name = \'TOUR ' + tour_name.toUpperCase() + '\''; 

}

function getDetailQueryStatement(hotel_name, zone_alias, tour_name) {

    return  'SELECT '+ getColumnNames().join(', ')+
            ' FROM pickups p'+
            ' INNER JOIN hotels h ON h.id = p.hotel_id' +
            ' INNER JOIN zones z ON z.id = p.zone_id' +
            ' INNER JOIN activities a ON a.id = p.activity_id' +
            ' WHERE h.name = \'' + hotel_name + '\'' +
            ' AND z.alias = \'' + zone_alias.toLowerCase() + '\'' +
            ' AND a.name = \'TOUR ' + tour_name.toUpperCase() + '\''; 

}

function getColumnNames(){
    return [
        'p.id',
        'p.pickup_time',
        'h.name as hotel_name',
        'z.alias as zone_alias',
        'z.name as zone_name',
        'a.name as tour_name',
    ]
}

function insertQueryStatement()
{
    return  'INSERT INTO pickups'+
            ' (id, hotel_id, activity_id, pickup_time, zone_id, created_at, updated_at)'+
            ' VALUES (null,'+ hotel_id +', '+ activity_id +', '+ pickup_time +', '+ zone_id +', '+ created_at +', '+ updated_at + ')';
}

module.exports = {
    getDetailQueryStatement,
    updateQueryStatement,
    getQueryStatement,
}