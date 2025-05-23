// This file groups all routes related to the table meant for user accounts (within the web application's database).




// Necessary imports are made. They are needed to make a router (with routes attached), use service functions, and run middleware functions.
const express = require("express");

const user_router = express.Router();

const {user_service} = require("../Services/user-service");

const {check_session,reverse_check_session} = require("../Middleware/session-middleware");

const {check_purpose} = require("../Middleware/user-middleware");

const {create_response} = require("../Utilities/response-utility");




// A HTTP Get route renders a page where a user can register for a new account.
user_router.get("/register", reverse_check_session, async(request_object,response_object) => {

    response_object.render("Pages/user-register");

});




// A HTTP Post route handles the processes when a user submits credentials to register for a new account.
user_router.post("/register", reverse_check_session, async(request_object,response_object) => {

    this.user_service = new user_service();

    const result_object = await this.user_service.register(request_object);

    const message_for_response_object = { message : result_object.error };

    if (!result_object.success) {
        if (result_object.code===400) {
            response_object.status(400).json(message_for_response_object);
        }
        else if (result_object.code===500) {
            response_object.status(500).json(message_for_response_object);
        };

    }
    else {
        response_object.status(201).json(message_for_response_object);
    };

});




// A HTTP Get route renders a page where a user can log into an existing account.
user_router.get("/login", reverse_check_session, async(request_object,response_object) => {

    response_object.render("Pages/user-login");

});




// A HTTP Post route handles the processes when a user submits credentials to log into a new account.
user_router.post("/login", reverse_check_session, async(request_object,response_object) => {

    this.user_service = new user_service();

    const result_object = await this.user_service.login(request_object);

    const message_for_response_object = { message : result_object.error };

    if (!result_object.success) {
        if (result_object.code===400) {
            response_object.status(400).json(message_for_response_object);
        }
        else if (result_object.code===401) {
            response_object.status(401).json(message_for_response_object);
        }
        else if (result_object.code===500) {
            response_object.status(500).json(message_for_response_object);
        };
    }

    else {
        response_object.status(201).json(message_for_response_object);
    };

});




// A HTTP Get route handles the processes to render a page where a user can view a profile (either their own or someone else's).
user_router.get("/profile/:argument", check_session, async(request_object,response_object) => {

    this.user_service = new user_service();

    if (!request_object.params.argument) {
        const message_for_response_error = { message : "Error! Our app cannot display a profile because no argument was provided to identify a user" };
        response_object.status(404).json(message_for_response_error);
    }

    if (request_object.params.argument.toUpperCase()==="SELF") {
        const result_object = await this.user_service.retrieve_profile_details(request_object.session.user.id);
        if (result_object.success) {
            const data_of_result_object = result_object.data;
            response_object.render("Pages/profile-self", { user : data_of_result_object });
        }
        else {
            if (result_object.code===404) {
                response_object.status(404).json({ message : result_object.error });
            }
            else if (result_object.code===500) {
                response_object.status(500).json({ message : result_object.error });
            };
        };
    }

    else {
        const result_object = await this.user_service.retrieve_profile_details(request_object.params.argument);
        if (result_object.success) {
            const data_of_result_object = result_object.data;
            if (request_object.params.argument==request_object.session.user.id) {
                response_object.render("Pages/profile-self", { user : data_of_result_object });
            }
            else {
                response_object.render("Pages/profile-other", {
                    you : request_object.session.user,
                    account : data_of_result_object 
                });
            };
        }
        else {
            if (result_object.code===404) {
                response_object.status(404).json({ message : result_object.error });
            }
            else if (result_object.code===500) {
                response_object.status(500).json({ message : result_object.error });
            };
        };
    };    

});




// A HTTP Post route handles count processes when a user chooses to follow or unfollow another user's profile. Unfortunately, it does not perform as expected because a relevant view script fails to fetch from it properly.
user_router.post("/profile", check_purpose, async(request_object,response_object) => {

    this.user_service = new user_service();

    const view_script_header = request_object.header("Update-Purpose");

    var result_object = {};
    var message_for_response_object = { message : ""};

    switch(view_script_header) {
        case "Add-Follower":
            result_object = await this.user_service.gain_follower(request_object.body.given_ID);
            message_for_response_object.message = result_object.error;
            break;
        case "Remove-Follower":
            result_object = await this.user_service.lose_follower(request_object.body.given_ID);
            message_for_response_object.message = result_object.error;
            break;
        case "Add-Following":
            result_object = await this.user_service.start_following(request_object.body.given_ID);
            message_for_response_object.message = result_object.error;
            break;
        case "Remove-Following":
            result_object = await this.user_service.stop_following(request_object.body.given_ID);
            message_for_response_object.message = result_object.error;
            break;
        default:
            result_object = await create_response(false,406,null,"Error! Our app did not receive context properly for what to update on a user account's profile")
            message_for_response_object.message = result_object.error;
    };

    if (result_object.success) {
        response_object.status(204).json(message_for_response_object);
    }
    else {
        if (result_object.code===406) {
            response_object.status(406).json(message_for_response_object);
        }
        else if (result_object.code===500) {
            response_object.status(500).json(message_for_response_object);
        };
    };
    

});




// A HTTP Get route renders a page where a user can choose to log out of an account.
user_router.get("/logout", check_session, async(request_object,response_object) => {

    response_object.render("Pages/user-logout");

});




// A HTTP Post route handles the processes when a user confirms the decision to log out of an account.
user_router.post("/logout", check_session, async(request_object,response_object) => {

    request_object.session.destroy(function(error_logout) {
        if (error_logout) {
            response_object.status(500).json({ success_logout : false });
        }
        else {
            response_object.status(200).json({ success_logout : true });
        };
    });

});




// The router object is exported, for use by the web application's index file.
module.exports = {user_router};