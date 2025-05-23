// This file handles the web application's business logic, specifically the logic related to user accounts.




// Necessary imports are made. They are needed to use DAO class functions and utility functions.
const {user_dao} = require("../DAOs/user-dao");

const {create_response} = require("../Utilities/response-utility");

const {generate_hash,verify_password} = require("../Utilities/bcrypt-utility");




class user_service {


    // A constructor in the service class initialises a DAO class object.
    constructor () {
        this.user_dao = new user_dao();
    };


    // A register function handles processes for validating user credentials and creating a new account.
    async register(request_object) {

        if (!request_object.body.forename||!request_object.body.surname||!request_object.body.email||!request_object.body.password||!request_object.body.confirm) {
            return await create_response(false,400,null,"Error! Users must provide first and last names, a unique valid email, and a confirmed password to create an account");
        };

        const email_valid_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_valid_pattern.test(request_object.body.email)) {
            return await create_response(false,400,null,"Error! Users must provide first and last names, a unique valid email, and a confirmed password to create an account");
        };

        if (request_object.body.password!=request_object.body.confirm) {
            return await create_response(false,400,null,"Error! Users must provide first and last names, a unique valid email, and a confirmed password to create an account");
        };

        try {
            request_object.body.password = await generate_hash(request_object.body.password);
            const request_object_for_dao = {
                "forename" : request_object.body.forename,
                "surname" : request_object.body.surname,
                "email" : request_object.body.email,
                "password" : request_object.body.password
            };
            const result_object = await this.user_dao.create_user(request_object_for_dao);
            return result_object;
        }

        catch (error_register) {
            return await create_response(false,500,null,"Error! Our app failed to register a new account with the credentials provided for an unknown reason");
        };

    };


    // A login function handles processes for validating user credentials, logging into an existing account, and creating a new session object.
    async login(request_object) {

        if (!request_object.body.email||!request_object.body.password) {
            return await create_response(false,400,null,"Error! Users must provide a valid email and a password, to log into an account");
        };

        const email_valid_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_valid_pattern.test(request_object.body.email)) {
            return await create_response(false,400,null,"Error! Users must provide a valid email and a password, to log into an account");
        };

        try {
            const result_of_get_query = await this.user_dao.get_user_by_email(request_object.body.email);
            const passwords_match = await verify_password(request_object.body.password,result_of_get_query.data._password_);
            if (!passwords_match) {
                return await create_response(false,401,null,"Error! None of the accounts currently registered on our app can be logged into with the credentials provided");
            };
            const result_of_update_query = await this.user_dao.update_user_last_login(result_of_get_query.data._id_);
            if (result_of_update_query.success) {
                request_object.session.user = {
                    id : result_of_get_query.data._id_,
                    name : `${result_of_get_query.data._forename_} ${result_of_get_query.data._surname_}`,
                    loginPrevious : `${result_of_get_query.data._last_login_}`
                };
                request_object.session.isAuthenticated = true;
                result_of_get_query.data = null;
                return result_of_get_query;
            };
        }

        catch (error_login) {
            const message_of_error_login = error_login.message;
            if (message_of_error_login.includes("None of the accounts currently registered")) {
                return await create_response(false,401,null,message_of_error_login);
            }
            else {
                return await create_response(false,500,null,"Error! Our app failed to log into an existing account with the credentials provided for an unknown reason");
            };
        };

    };


    // A logout function was meant to handle processes for clearing session data. However it was not used by the final version of the logout route
    async logout(request_object) {

        try {
            request_object.session = null;
            return await create_response(true,200,null,"No errors here, you're now successfully logged out of your user account~");
        }

        catch (error_logout) {
            return await create_response(false,500,null,"Error!");
        };

    };


    // A retrieve function handles processes for accessing select account details (needed when a user's profile page is being loaded).
    async retrieve_profile_details(user_ID) {

        try {
            const result_of_get_query = await this.user_dao.get_user_by_ID(user_ID);
            return await create_response(true,200,result_of_get_query.data,result_of_get_query.error);
        }

        catch (error_details) {
            const message_of_error_login = error_details.message;
            if (message_of_error_login.includes("No accounts registered on our app")) {
                return await create_response(false,404,null,message_of_error_login);
            }
            else {
                return await create_response(false,500,null,"Error! Our app failed to retrieve details from a registered user account for an unknown reason");
            };
            
        };

    };


    // A gain function handles processes for adding to a user's follower count (when another user follows them).
    async gain_follower(user_ID) {

        try {
            const result_object = this.user_dao.update_user_add_follower(user_ID);
            return result_object;
        }

        catch (error_update) {
            return await create_response(false,500,null,"Error! Our app failed to add a follower for an unknown reason");
        };

    };


    // A lose function handles processes for subtracting from a user's follower count (when another user unfollows them).
    async lose_follower(user_ID) {

        try {
            const result_object = this.user_dao.update_user_remove_follower(user_ID);
            return result_object;
        }

        catch (error_update) {
            return await create_response(false,500,null,"Error! Our app failed to remove a follower for an unknown reason");
        };

    };


    // A start function handles processes for adding to a user's following count (when they follow another user).
    async start_following(user_ID) {

        try {
            const result_object = this.user_dao.update_user_add_following(user_ID);
            return result_object;
        }

        catch (error_update) {
            return await create_response(false,500,null,"Error! Our app failed to add a following for an unknown reason");
        };

    };


    // A start function handles processes for subtracting from a user's following count (when they unfollow another user).
    async stop_following(user_ID) {

        try {
            const result_object = this.user_dao.update_user_remove_following(user_ID);
            return result_object;
        }

        catch (error_update) {
            return await create_response(false,500,null,"Error! Our app failed to remove a following for an unknown reason");
        };

    };


};




// The service class is exported, for use by the web application's user router.
module.exports = {user_service};