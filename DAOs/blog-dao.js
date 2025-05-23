// This file manages functions that query the web application's database, specifically in the table related to blog posts.




// Necessary imports are made. They are needed to access the database connection pool and use a utility function
const {connection_pool} = require("../Databases/sqlite-connection");

const {create_response} = require("../Utilities/response-utility");




class blog_dao {


    constructor () {};


    // An insert into query is used to create a record for a new blog post.
    async create_blog(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _blogs_ (_title_, _content_, _country_name_, _visit_date_, _author_) values (?,?,?,?,?)", [...Object.values(request_object)], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,"Error! Our app failed to create a blog post with the details provided for an unknown reason"));
                }
                resolve_object(create_response(true,201,null,"No errors here, you've successfully created a new blog post~"));
            });
        });
    };


    // A select query was meant to get a blog record's data by ID value (necessary when a specific blog post is chosen for viewing). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_blog_by_ID(request_object) {};


    // A select query was meant to get blog record data by country value (necessary when blogs are searched for by country name). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_blogs_by_country(request_object) {};


    // A select query was meant to get blog record data by user ID value (necessary when blogs are searched for by author). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_blogs_by_user(request_object) {};


    // A select query was meant to get blog record data ordered by creation dates(necessary for a 'most recent' feed). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_all_blogs_ordered_by_recency(request_object) {};


    // A select query was meant to get blog record data ordered by like counts (necessary for a 'most liked' feed). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_all_blogs_ordered_by_likes(request_object) {};


    // A select query was meant to get blog record data ordered by comment counts(necessary for a 'most commented' feed). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async get_all_blogs_ordered_by_comments(request_object) {};


    // An update query was modify the content value of a blog record (necessary when a user edits their blog post). Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async update_blog_edit(request_object) {};


    // An update query is used to increase the comment count of a blog record (necessary when a user adds a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_gain_comment(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _comment_num_ = _comment_num_ + 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // An update query is used to decrease the comment count of a blog record (necessary when a user removes a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_lose_comment(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _comment_num_ = _comment_num_ - 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // An update query is used to increase the like count of a blog record (necessary when a user adds a like to a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_gain_like(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _like_num_ = _like_num_ + 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // An update query is used to decrease the like count of a blog record (necessary when a user removes a like from a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_lose_like(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _like_num_ = _like_num_ - 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // An update query is used to increase the dislike count of a blog record (necessary when a user adds a dislike to a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_gain_dislike(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _dislike_num_ = _dislike_num_ + 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // An update query is used to decrease the dislike count of a blog record (necessary when a user removes a dislike from a comment under a blog post). Unfortunately it is unused due to other difficulties in this project which took up time.
    async update_blog_lose_dislike(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("update _blogs_ set _dislike_num_ = _dislike_num_ - 1 where _id_ = ?", [request_object.body.ID], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(create_response(false,500,null,""));
                };
                resolve_object(create_response(true,204,null,""));
            });
        });
    };


    // A delete query was meant to delete a record when a user deletes a blog post. Unfortunately it is unfinished due to other difficulties in this project which took up time.
    async delete_blog(request_object) {};


};




// The dao class is exported, for use by the web application's blog service.
module.exports = {blog_dao};