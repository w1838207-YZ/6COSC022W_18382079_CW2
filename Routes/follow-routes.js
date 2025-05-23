// This file groups all routes related to the table meant for user follows (within the web application's database).




// Necessary imports are made. They are needed to make a router (with routes attached), use service functions, and run middleware functions.
const express = require("express");

const follow_router = express.Router();

const {follow_service} = require("../Services/follow-service");

const {check_session,reverse_check_session} = require("../Middleware/session-middleware");




// A HTTP Post route handles create processes when a user chooses to follow another user's profile.
follow_router.post("/create", check_session, async(request_object,response_object) => {

    this.follow_service = new follow_service();

    const result_object = await this.follow_service.create_follow(request_object);

    const message_for_response_object = { message : result_object.error };

    if (result_object.success) {
        response_object.status(201).json(message_for_response_object);
    }
    else {
        response_object.status(500).json(message_for_response_object);
    };

});




// A HTTP Post route handles processes which confirm whether a user is already following some other user's profile, before they could attempt to follow it again (which is logically possible but realistically would make no sense).
follow_router.post("/conflict", check_session, async(request_object,response_object) => {

    this.follow_service = new follow_service();

    const result_object = await this.follow_service.check_conflict(request_object);

    const message_for_response_object = { message : result_object.error };

    if (result_object.success) {
        response_object.status(200).json(message_for_response_object);
    }

    else {
        if (result_object.code===409) {
            response_object.status(409).json(message_for_response_object);
        }
        else if (result_object.code===500) {
            response_object.status(500).json(message_for_response_object);
        };
    };

});




// A HTTP Post route handles create processes when a user chooses to unfollow another user's profile. Unfortunately it is unfinished due to other difficulties in this project which took up time.
follow_router.post("/delete", check_session, async(request_object,response_object) => {

    this.follow_service = new follow_service();

    const result_object = await this.follow_service.delete_follow(request_object);

    const message_for_response_object = { message : result_object.error };

});




// The router object is exported, for use by the web application's index file.
module.exports = {follow_router};