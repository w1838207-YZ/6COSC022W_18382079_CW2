// This file handles the web application's business logic, specifically the logic related to REST Countries data.




// Necessary imports are made. They are needed to use DAO class functions and a utility function.
const {country_dao} = require("../DAOs/country-dao");

const {create_response} = require("../Utilities/response-utility");




// An order function ensures that extracted country information/names is returned in alphabetical order.
async function get_extraction_order(country_json) {

    var order_sorted = [];

    for (let i=0; i<country_json.length; i++) {
        var given_country = country_json[i];
        if (given_country.name.common) {
            order_sorted.push(given_country.name.common);
        }
        else if (given_country.name.official) {
            order_sorted.push(given_country.name.official);
        };
    };

    order_sorted.sort();

    return order_sorted;

};




// A cherry-pick function handles processes for extracting select information of either all countries or one country in the REST Countries API.
async function extract_cherry_picked_information(country_json) {


    const extraction_order = await get_extraction_order(country_json);


    var extraction_result = [];


    for (let i=0; i<extraction_order.length; i++) {

        for (let j=0; j<country_json.length; j++) {

            var current_country = country_json[j];

            if ((current_country.name.common===extraction_order[i])||(current_country.name.official===extraction_order[i])) {

                var data_to_push = {
                    "name" : "N/A",
                    "currency" : "N/A",
                    "capital" : "N/A",
                    "language" : "N/A",
                    "flag" : "N/A"
                };

                if (current_country.name) {
                    var names_to_add = {};
                    if (current_country.name.common) {
                        names_to_add["common"] = current_country.name.common;
                    };
                    if (current_country.name.official) {
                        names_to_add["official"] = current_country.name.official;
                    };
                    data_to_push.name = names_to_add;
                };

                if (current_country.currencies) {
                    var currencies_to_add = {};
                    var k = 1;
                    for (let key in current_country.currencies) {
                        currencies_to_add[`${k}`] = current_country.currencies[key].name
                        k++;
                    };
                    data_to_push.currency = currencies_to_add;
                };

                if (current_country.capital) {
                    var capitals_to_add = {};
                    for (let k=0; k<current_country.capital.length; k++) {
                        capitals_to_add[`${k+1}`] = current_country.capital[k];
                    };
                    data_to_push.capital = capitals_to_add;
                };

                if (current_country.languages) {
                    var languages_to_add = {};
                    var k = 1;
                    for (let key in current_country.languages) {
                        languages_to_add[`${k}`] = current_country.languages[key]
                        k++;
                    };
                    data_to_push.language = languages_to_add;
                };

                if (current_country.flags) {
                    var flags_to_add = {};
                    if (current_country.flags.png) {
                        flags_to_add["png"] = current_country.flags.png;
                    }
                    else {
                        flags_to_add["svg"] = current_country.flags.svg;
                    };
                    if (current_country.flags.alt) {
                        flags_to_add["alt"] = current_country.flags.alt;
                    };
                    data_to_push.flag = flags_to_add;
                };

                extraction_result.push(data_to_push);

                break;

            };

        };

    };


    return extraction_result;

};



// A name function handles processes for extracting the name(s) of either all countries or one country in the REST Countries API.
async function extract_names(country_json) {


    const extraction_order = await get_extraction_order(country_json);


    var extraction_result = [];


    for (let i=0; i<extraction_order.length; i++) {

        for (let j=0; j<country_json.length; j++) {

            var current_country = country_json[j];

            if ((current_country.name.common===extraction_order[i])||(current_country.name.official===extraction_order[i])) {

                var data_to_push = {
                    "name" : "N/A"
                };

                if (current_country.name) {
                    if (current_country.name.common) {
                        data_to_push.name = current_country.name.common;
                    }
                    else if (current_country.name.official) {
                        data_to_push.name = current_country.name.official;
                    };
                };

                extraction_result.push(data_to_push);

                break;

            };

        };

    };


    return extraction_result;

};




class country_service {


    // A constructor in the service class initialises a DAO class object.
    constructor () {
        this.country_dao = new country_dao();
    };


    // An info class function handles processes for extracting select information of all countries in the REST Countries API.
    async retrieve_every_info() {

        try {
            const result_json = await this.country_dao.get_all_countries();
            const result_extract = await extract_cherry_picked_information(result_json);
            return await create_response(true,200,result_extract,"No errors here, you've successfully retrieved cherry-picked info of all countries from the REST Countries API~");
        }

        catch (error_retrieve) {
            return await create_response(false,500,null,"Error! Our app failed to retrieve cherry-picked information of all countries from REST Countries for an unknown reason");
        };

    };


    // Another info class function handles processes for extracting select information of one country in the REST Countries API
    async retrieve_single_info(searched_name) {

        try {
            const result_json = await this.country_dao.get_country_by_name(searched_name);
            const result_extract = await extract_cherry_picked_information(result_json);
            return await create_response(true,200,result_extract,"No errors here, you've successfully retrieved cherry-picked info of one country from the REST Countries API~");
        }

        catch (error_retrieve) {
            const message_of_error_retrieve = error_retrieve.message;
            if (message_of_error_retrieve.includes("no data entries associated")) {
                return await create_response(false,404,null,message_of_error_retrieve);
            }
            else {
                return await create_response(false,500,null,"Error! Our app failed to retrieve cherry-picked information of one country from REST Countries for an unknown reason");
            };
        };

    };


    // A name class function handles processes for extracting the name of all countries in the REST Countries API.
    async retrieve_every_name() {

        try {
            const result_json = await this.country_dao.get_all_countries();
            const result_extract = await extract_names(result_json);
            return await create_response(true,200,result_extract,"No errors here, you've successfully retrieved the names of all countries from the REST Countries API~");
        }

        catch (error_retrieve) {
            return await create_response(false,500,null,"Error! Our app failed to retrieve the names of all countries from REST Countries for an unknown reason");
        };

    };


    // Another name class function handles processes for extracting the name of one country in the REST Countries API.
    async retrieve_single_name(searched_name) {

        try {
            const result_json = await this.country_dao.get_country_by_name(searched_name);
            const result_extract = await extract_names(result_json);
            return await create_response(true,200,result_extract,"No errors here, you've successfully retrieved the name of one country from the REST Countries API~");
        }

        catch (error_retrieve) {
            const message_of_error_retrieve = error_retrieve.message;
            if (message_of_error_retrieve.includes("no data entries associated")) {
                return await create_response(false,404,null,message_of_error_retrieve);
            }
            else {
                return await create_response(false,500,null,"Error! Our app failed to retrieve the name of one country from REST Countries for an unknown reason");
            };
        };

    };


};




// The service class is exported, for use by the web application's country router.
module.exports = {country_service};