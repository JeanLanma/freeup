const { getDateTime } = require('../utils');

function InsertPickupQuery(hotel_id, activity_id, pickup_time, zone_id){
    return  "INSERT INTO `pickups`"+ 
            " (`id`, `hotel_id`, `activity_id`, `pickup_time`, `zone_id`, `created_at`, `updated_at`)"+
            " VALUES (NULL, '"+ hotel_id +"', '"+ activity_id +"'', '"+ pickup_time +"'', '"+ zone_id +"'', '"+ getDateTime() +"', '"+ getDateTime() +"')";
}

module.exports = {
    InsertPickupQuery
};