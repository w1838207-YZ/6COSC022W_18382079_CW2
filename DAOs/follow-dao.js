// This file manages functions that query the web application's database, specifically in the table related to user follows.




// Necessary imports are made. They are needed to access the database connection pool and use a utility function
const {connection_pool} = require("../Databases/sqlite-connection");

const {create_response} = require("../Utilities/response-utility");




class follow_dao {


    constructor () {};


    // An insert into query is used to create a record for a new user follow.
    async create_follow(follower,followed) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _follows_ (_follower_, _following_) values (?,?)", [follower,followed], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to facilitate you following a user for an unknown reason"));
                }
                resolve_object(create_response(true,201,null,"No errors here, you're now successfully following a user!"));
            });
        });
    };


    // A select query is used to get follow records data by follower and following values (necessary to check if a user is already following another one and restrict them from following that same user twice, which they mustn't be able to do).
    async check_conflicting_follow(follower,followed) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select * from _follows_ where _follower_ = ? and _following_ = ? ", [follower,followed], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("Error! Our app failed to check existing follow records for an unknown reason"));
                };
                if (result_rows) {
                    reject_object(new Error("Error! You're currently already following the user whose follow button you've just pressed"));
                };
                resolve_object(create_response(true,200,null,"No errors here, you've been confirmed to have no conflicting follows from beforehand"));
            });
        });
    };


    // A delete query was meant to delete a record when a user unfollows another. Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async delete_follow(request_object) {};


};




// The dao class is exported, for use by the web application's follow service.
module.exports = {follow_dao};