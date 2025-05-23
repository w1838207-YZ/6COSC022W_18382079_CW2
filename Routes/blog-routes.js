// This file groups all routes related to the table meant for blog posts (within the web application's database).




// Necessary imports are made. They are needed to make a router (with routes attached), use service functions, and run middleware functions.
const express = require("express");

const blog_router = express.Router();

const {blog_service} = require("../Services/blog-service");

const {check_session,reverse_check_session} = require("../Middleware/session-middleware");




// A HTTP Get route renders a page where a user can create a new blog post.
blog_router.get("/new", check_session, async(request_object,response_object) => {

    response_object.render("Pages/new-blog");

});




// A HTTP Post route handles the processes when a user submits details with which to create a new blog post.
blog_router.post("/new", check_session, async(request_object,response_object) => {

    this.blog_service = new blog_service();

    const result_object = await this.blog_service.make_new_blog_post(request_object);

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




// A HTTP Get route renders a page where a user can view results of searching for blog posts. Unfortunately it is incomplete because it cannot render correctly, and there were other difficulties in this project which took up time.
blog_router.get("/search", async(request_object,response_object) => {

    response_object.render("Pages/search-results", request_object.body);

});




// A HTTP Post route handles the processes when a results page is populated with blogs as search results. Unfortunately it is incomplete because it cannot render or be populated correctly, and there were other difficulties in this project which took up time.
blog_router.post("/search", async(request_object,response_object) => {

    const signed_in = false;
    if (request_object.session.isAuthenticated) {
        signed_in = true;
    };

    this.blog_service = new blog_service();

    const result_object = await this.blog_service.search_for_blog_posts(request_object);

    response_object.status(200).json({
        result : result_object.error,
        isAuthenticated : signed_in
    });

});




// The router object is exported, for use by the web application's index file.
module.exports = {blog_router};