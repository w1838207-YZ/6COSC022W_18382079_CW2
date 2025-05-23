// This file groups all routes related to the table meant for country data (retrieved from the REST Countries API).




// Necessary imports are made. They are needed to make a router (with routes attached), use service functions, and run middleware functions.
const express = require("express");

const country_router = express.Router();

const {country_service} = require("../Services/country-service");

const {check_fetched} = require("../Middleware/country-middleware");




// A HTTP Get route accesses cherry-picked country information, primarily from the REST Countries API, or alternatively from failsafe data.
country_router.get("/info/:argument", check_fetched, async(request_object,response_object) => {

    this.country_service = new country_service();

    if (!request_object.params.argument) {
        const message_for_response_error = { message : "Error! Our app cannot retrieve any information because no argument was provided to search with" };
        response_object.status(404).json(message_for_response_error);
    }

    else {
        if (request_object.params.argument.toUpperCase()==="ALL") {
            const result_object = await this.country_service.retrieve_every_info();
            if (result_object.success) {
                const info_for_response_object = { info : result_object.data };
                response_object.status(200).json(info_for_response_object);
            }
            else {
                response_object.status(500).json(result_object);
            };
        }
        else {
            const result_object = await this.country_service.retrieve_single_info(request_object.params.argument);
            if (result_object.success) {
                const info_for_response_object = { info : result_object.data };
                response_object.status(200).json(info_for_response_object);
            }
            else {
                if (result_object.code===404) {
                    response_object.status(404).json(result_object);
                }
                else if (result_object.code===500) {
                    response_object.status(500).json(result_object);
                };
            };
        };
    };

});




// A HTTP Get route accesses specifically country names, primarily from the REST Countries API, or alternatively from failsafe data.
country_router.get("/names/:argument", check_fetched, async(request_object,response_object) => {

    this.country_service = new country_service();

    if (!request_object.params.argument) {
        const message_for_response_error = { message : "Error! Our app cannot retrieve any names because no argument was provided to search with" };
        response_object.status(404).json(message_for_response_error);
    }

    else {
        if (request_object.params.argument.toUpperCase()==="ALL") {
            const result_object = await this.country_service.retrieve_every_name();
            if (result_object.success) {
                const names_for_response_object = { names : result_object.data };
                response_object.status(200).json(names_for_response_object);
            }
            else {
                response_object.status(500).json(result_object);
            };
        }
        else {
            const result_object = await this.country_service.retrieve_single_name(request_object.params.argument);
            if (result_object.success) {
                const names_for_response_object = { names : result_object.data };
                response_object.status(200).json(names_for_response_object);
            }
            else {
                if (result_object.code===404) {
                    response_object.status(404).json(result_object);
                }
                else if (result_object.code===500) {
                    response_object.status(500).json(result_object);
                };
            };
        };
    };

});




// The router object is exported, for use by the web application's index file.
module.exports = {country_router};