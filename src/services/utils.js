const prepareData = (str) => {
    if (str === undefined) {
        return '';
    }

    return str.trim();
}

const usePrepareGetParams = (params) => {
    const { hotel_name, zone_alias, tour_name } = params;
    return {
        hotel_name: prepareData(hotel_name),
        zone_alias: prepareData(zone_alias).toLowerCase(),
        tour_name: prepareData(tour_name).toUpperCase()
    }
}
const usePrepareUpdateParams = (params) => {
    const { hotel_name, zone_alias, tour_name } = usePrepareGetParams(params);
    const { pickup_time } = params;
    return {
        pickup_time: prepareData(pickup_time),
        hotel_name,
        zone_alias,
        tour_name
    }
}

/**
 * 
 * Format pickup_time to HH:MM  i.e. 5:10 to 05:10
 * 
 * @param {string} pickup_time
 * @returns {string} formatted pickup_time 
 */
function formatPickupTime(pickup_time){

    if(pickup_time === undefined || pickup_time === ''){
        return '';
    }

    pickup_time = pickup_time.trim();

    const [hours, minutes] = pickup_time.split(':');
    const formattedHours = hours.length === 1 ? `0${hours}` : hours;
    const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;

}

function resultMessage(result){

    if(result != null){
        return  'El hotel '+ result.hotel_name +
                ' tiene pickup a las ' + result.pickup_time.slice(0,5) +
                ' para ' + result.tour_name +
                ' en la zona ' + result.zone_alias +
                ' [' + result.zone_name.charAt(0).toUpperCase() + result.zone_name.slice(1) + ']';
    }

}

module.exports = {
    usePrepareGetParams,
    usePrepareUpdateParams,
    formatPickupTime,
    resultMessage,
}