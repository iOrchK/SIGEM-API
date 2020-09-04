var Messages = require("../config/utils/messages.json");
var FileSync = require('fs');

module.exports = (status, data) => {
    var result = JSON.parse(FileSync.readFileSync("config/schemas/response.json"));
    result.status = status;
    result.message = Messages[status];
    
    if (+status >= 200 && +status <= 299) {
        result.result = data;
        console.log(`${result.status} ${result.message}`);
    } else {
        result.error = data;
        console.error(`${result.status} ${result.message}: ${result.error}`);
    }
    return result;
}