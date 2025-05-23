// This file handles the web application's business logic, specifically the logic related to blog posts.




// Necessary imports are made. They are needed to use DAO class functions and a utility function.
const {blog_dao} = require("../DAOs/blog-dao");

const {create_response} = require("../Utilities/response-utility");




class blog_service {


    // A constructor in the service class initialises a DAO class object.
    constructor () {
        this.blog_dao = new blog_dao();
    };


    // A make function handles processes for validating user-submitted details and creating a new blog post.
    async make_new_blog_post(request_object) {

        if (!request_object.body.title||!request_object.body.content||!request_object.body.country||!request_object.body.date) {
            return await create_response(false,400,null,"Error! A");
        };

        if (request_object.body.country==="Select Country") {
            return await create_response(false,400,null,"Error! B");
        };
        
        try {
            const author_ID = request_object.session.user.id;
            const request_object_for_dao = {
                "title" : request_object.body.title,
                "content" : request_object.body.content,
                "country" : request_object.body.country,
                "date" : request_object.body.date,
                "author" : author_ID
            };
            const result_object = await this.blog_dao.create_blog(request_object_for_dao);
            return result_object;
        }

        catch (error_register) {
            return await create_response(false,500,null,"Error! Our app failed to create a blog post with the details provided for an unknown reason");
        };

    };


    // A search function handles processes for searching through blog posts. Unfortunately it is unused because the relevant route function is incomplete, due rendering, populating, and other difficulties in this project which took up time.
    async search_for_blog_posts(request_object) {

        if (request_object.body.country&&request_object.body.author) {
            return await create_response(false,400,null,"Error! Alpha");
        };

        if (!request_object.body.country&&!request_object.body.author) {
            return await create_response(false,400,null,"Error! Beta");
        };

    };


};




// The service class is exported, for use by the web application's blog router.
module.exports = {blog_service};