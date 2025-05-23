// This file handles the web application's business logic, specifically the logic related to account follows.




// Necessary imports are made. They are needed to use DAO class functions and a utility function.
const {follow_dao} = require("../DAOs/follow-dao");

const {create_response} = require("../Utilities/response-utility");




class follow_service {


    // A constructor in the service class initialises a DAO class object.
    constructor () {
        this.follow_dao = new follow_dao();
    };


    // A create function handles processes for creating a new record representing one user following another user's profile.
    async create_follow(request_object) {

        try {
            const result_object = await this.follow_dao.create_follow(request_object.body.ID_1, request_object.body.ID_2);
            return result_object;
        }

        catch (error_create) {
            return await create_response(false,500,null,"Error! Our app failed to facilitate you following a user for an unknown reason");
        };

    };


    // A check function handles processes for confirming whether a user is already following some other user's profile, before they could attempt to follow it again (which is logically possible but realistically would make no sense).
    async check_conflict(request_object) {

        try {
            const result_object = await this.follow_dao.check_conflicting_follow(request_object.body.ID_1, request_object.body.ID_2);
            return result_object;
        }

        catch (error_check) {
            const message_of_error_check = error_check.message;
            if (message_of_error_check.includes("You're currently already following")) {
                return await create_response(false,409,null,message_of_error_check);
            }
            else {
                return await create_response(false,500,null,"Error! Our app failed to facilitate you following a user for an unknown reason");
            }
        };

    };


    // A delete function handles processes for deleting a follow record. Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async delete_follow(request_object) {};


};




// The service class is exported, for use by the web application's follow router.
module.exports = {follow_service};