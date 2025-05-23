// This file manages functions that query the web application's database, specifically in the table related to blog comments.




// Necessary imports are made. They are needed to access the database connection pool and use a utility function
const {connection_pool} = require("../Databases/sqlite-connection");

const {create_response} = require("../Utilities/response-utility");




class comment_dao {


    constructor () {};


    // An insert into query is used to create a record for a new blog comment. Unfortunately it is unused due to other difficulties in this project which took up time.
    async create_comment(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _comments_ (_content_, _liked_, _disliked_, _author_, _post_) values (?,?,?,?,?)", [...Object.values(request_object.body)], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                }
                resolve_object(create_response(true,201,null,""));
            });
        });
    };


    // A select query was meant to get comment record data by blog ID value (necessary when loading all comments under a blog). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_comments_by_blog_ID(request_object) {};


    // An update query was modify the content value of a comment record (necessary when a user edits their comment's content). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async update_comment_edit(request_object) {};


    // An update query is used to modify the liked value of a comment record (necessary when a user adds a like to their comment). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_comment_like_given(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _comments_ set _liked_ = true where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,200,null,""));
            });
        });
    };


    // An update query is used to modify the liked value of a comment record (necessary when a user removes a like from their comment). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_comment_like_taken(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _comments_ set _liked_ = false where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,200,null,""));
            });
        });
    };


    // An update query is used to modify the disliked value of a comment record (necessary when a user adds a dislike to their comment). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_comment_dislike_given(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _comments_ set _disliked_ = true where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,200,null,""));
            });
        });
    };


    // An update query is used to modify the disliked value of a comment record (necessary when a user removes a dislike from their comment). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_comment_dislike_taken(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _comments_ set _disliked_ = false where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,200,null,""));
            });
        });
    };


    // A delete query was meant to delete a record when a user gets rid of one of their comments. Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async delete_comment(request_object) {};


};




// The dao class is exported, for use by the web application's comment service.
module.exports = {comment_dao};