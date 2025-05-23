// This file manages functions that return country data, either fetched from the REST Countries API or taken from the utility function for getting failsafe data.




// A necessary imports is made, needed to use a utility function.
const {get_failsafe} = require("../Utilities/failsafe-utility");




class country_dao {


    constructor () {};


    // One get function is used to retrieve the raw data of all countries. 
    async get_all_countries() {

        try {
            const result_raw = await fetch("https://restcountries.com/v3.1/all");
            const json_of_result_raw = await result_raw.json();
            return json_of_result_raw;
        }

        catch (error_fetch) {
            const result_failsafe = await get_failsafe();
            if (!result_failsafe) {
                throw new Error("Error! Our app failed to fetch entries for all countries' data for an unknown reason");
            };
            return result_failsafe;
        };

    };


    // Another get function is used to retrieve the raw data of a single country.
    async get_country_by_name(searched_name) {

        try {
            const result_raw = await fetch(`https://restcountries.com/v3.1/name/${searched_name}?fullText=true`);
            const json_of_result_raw = await result_raw.json();
            if ((json_of_result_raw.message)&&(json_of_result_raw.message==="Not Found")) {
                throw new Error("Error! REST Countries keeps no data entries associated with the searched country name");
            };
            return json_of_result_raw;
        }

        catch (error_fetch) {
            const result_failsafe = await get_failsafe();
            if (!result_failsafe) {
                throw new Error("Error! Our app failed to fetch an entry for one country's data for an unknown reason");
            }
            else {
                const result_failsafe_single = [];
                for (let i=0; i<result_failsafe.length; i++) {
                    var given_country_name = result_failsafe[i].name.common;
                    if (given_country_name.toLowerCase()===searched_name.toLowerCase()) {
                        result_failsafe_single.push(result_failsafe[i]);
                    };
                };
                if (result_failsafe_single.length!=1) {
                    throw new Error("Error! REST Countries keeps no data entries associated with the searched country name");
                };
                return result_failsafe_single;
            };
        };

    };


};




// The dao class is exported, for use by the web application's country service.
module.exports = {country_dao};