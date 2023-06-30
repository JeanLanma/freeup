const connection = require('../db/mysql');

async function updatePickup(QueryString){

    return new Promise((resolve, reject) => {
        connection.query(QueryString, (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    })

}

async function getPickUp(QueryString){
    return new Promise((resolve, reject) => {
        connection.query(QueryString, (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

async function execute(QueryString){
    return new Promise((resolve, reject) => {
        connection.query(QueryString, (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    execute,
    getPickUp,
    updatePickup
}