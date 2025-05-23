// This file manages functions that query the web application's database, specifically in the table related to user accounts.




// Necessary imports are made. They are needed to access the database connection pool and use a utility function.
const {connection_pool} = require("../Databases/sqlite-connection");

const {create_response} = require("../Utilities/response-utility");




class user_dao {


    constructor () {};


    // An insert into query is used to create a record for a new user account.
    async create_user(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _users_ (_forename_, _surname_, _email_, _password_) values (?,?,?,?)", [...Object.values(request_object)], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("Error! Our app failed to register a new account with the credentials provided for an unknown reason"));
                };
                resolve_object(create_response(true,201,null,"No errors here, you've successfully registered a new user account~"));
            });
        });
    };


    // A select query is used to get a user record's data by email value (necessary for the identification stage of user authentication).
    async get_user_by_email(user_email) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select * from _users_ where _email_ = ?", [user_email], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("Error! Our app failed to log into an existing account with the credentials provided for an unknown reason"));
                };
                if (!result_rows) {
                    reject_object(new Error("Error! None of the accounts currently registered on our app can be logged into with the credentials provided"));
                };
                resolve_object(create_response(true,201,result_rows,"No errors here, you've successfully logged in with an existing user account~"));
            });
        });
    };


    // A select query is used to get a user record's data by ID value (necessary for accessing user details to display on their profile page).
    async get_user_by_ID(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select _id_, _forename_, _surname_, _followers_, _followings_ from _users_ where _id_ = ?", [user_ID], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("Error! Our app failed to retrieve details from a registered user account for an unknown reason"));
                };
                if (!result_rows) {
                    reject_object(new Error("Error! No accounts registered on our app were identified to get details from based on the credentials provided"));
                };
                resolve_object(create_response(true,200,result_rows,"No errors here, you've successfully retrieved details from a registered user account~"));
            });
        });
    };


    // An update query is used to modify the last login value of a user record (necessary for security when users sign in, so they can surmise if their account may have been used by someone other than them after a breach).
    async update_user_last_login(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _users_ set _last_login_ = CURRENT_TIMESTAMP where _id_ = ?", [user_ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("Error! Our app failed to update the previous login date of a user account for an unknown reason"));
                };
                resolve_object(create_response(true,200,null,"No errors here, your previous login date has been successfully updated~"));
            });
        });
    };


    // An update query is used to increase the follower count of a user record (necessary when another user follows their account).
    async update_user_add_follower(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _users_ set _followers_ = _followers_ + 1 where _id_ = ?", [user_ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to add a follower for an unknown reason"));
                };
                resolve_object(create_response(true,204,null,"No errors here, you've successfully gained one new follower"));
            });
        });
    };


    // An update query is used to decrease the follower count of a user record (necessary when another user unfollows their account).
    async update_user_remove_follower(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _users_ set _followers_ = _followers_ - 1 where _id_ = ?", [user_ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to remove a follower for an unknown reason"));
                };
                resolve_object(create_response(true,204,null,"No errors here, you've successfully lost one existing follower"));
            });
        });
    };


    // An update query is used to increase the following count of a user record (necessary when they follow another user's account).
    async update_user_add_following(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _users_ set _followings_ = _followings_ + 1 where _id_ = ?", [user_ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to add a following for an unknown reason"));
                };
                resolve_object(create_response(true,204,null,"No errors here, you've successfully started following one user"));
            });
        });
    };


    // An update query is used to increase the following count of a user record (necessary when they unfollow another user's account).
    async update_user_remove_following(user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _users_ set _followings_ = _followings_ - 1 where _id_ = ?", [user_ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to remove a following for an unknown reason"));
                };
                resolve_object(create_response(true,204,null,"No errors here, you've successfully stopped following one user"));
            });
        });
    };


};




// The dao class is exported, for use by the web application's user service.
module.exports = {user_dao};