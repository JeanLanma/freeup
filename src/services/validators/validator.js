function isset(variable){
    return typeof variable !== typeof undefined ? true : false;
}

function isEmpty(variable){
    return variable === '' ? true : false;
}

function isNull(variable){
    return variable === null ? true : false;
}

function string(variable){
    return typeof variable === 'string' && isNaN(variable) ? true : false;
}

function isNumber(variable){
    return typeof variable === 'number' ? true : false;
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

const useValidator = function(value, name) {

    const errors = [];
    const alias = name ?? 'value';

    return {
        //General
        required: function() {
            if(!isset(value) || isEmpty(value)) errors.push(alias + ' is required');
            return this;
        },
        notEmpty: function() {
            if(isEmpty(value)) errors.push(alias + ' is empty');
            return this;
        },
        notUndefined: function() {
            if(!isset(value)) errors.push(alias + ' is not set');
            return this;
        },
        notNull: function() {
            if(isNull(value)) errors.push(alias + ' is null');
            return this;
        },
        // String
        string: function() {
            if(!string(value)) errors.push(alias + ' is not a string');
            return this;
        },
        minLength: function(min) {
            if(!string(value) && value.length < min) errors.push(alias + ' is less than ' + min + ' characters');
            return this;
        },
        maxLength: function(max) {
            if(!string(value) && value.length > max) errors.push(alias + ' is greater than ' + max + ' characters');
            return this;
        },
        // Number
        number: function() {
            if(!isNumber(value)) errors.push(alias + ' is not a number');
            return this;
        },
        minNumber: function(min) {
            if(isNumber(value) && value < min) errors.push(alias + ' is less than ' + min);
            return this;
        },
        maxNumber: function(max) {
            if(isNumber(value) && value > max) errors.push(alias + ' is greater than ' + max);
            return this;
        },
        // Handlers
        hasErrors: function() {
            return errors.length > 0;
        },
        getErrors: function() {
            return errors;
        },
        getValue: function() {
            return value;
        },
        value: value
    }

}

module.exports = {
    useValidator,
    isValidPickupTime,
    isValidZoneAlias,
    isEmpty,
    isset
}