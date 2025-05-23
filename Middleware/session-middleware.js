// This file protects routes in the web application from being accessible if a user is signed in or signed out at a given moment.




// A function brings about failure if an active session doesn't currently exist, as indicated by the isAuthenticated flag value.
const check_session = async(request_object,response_object,next_object) => {

    if (!request_object.session.isAuthenticated) {
        const message_for_middleware_fail = { message : "Error! You can't access this page because you're not currently logged into our app" };
        return response_object.status(401).json(message_for_middleware_fail);
    };

    next_object();

};




// Another function brings about failure this time if an active session already exists, as indicated again by the isAuthenticated flag value.
const reverse_check_session = async(request_object,response_object,next_object) => {

    if (request_object.session.isAuthenticated) {
        const message_for_middleware_fail = { message : "Error! You can't access this page anymore because you're already logged into our app" };
        return response_object.status(401).json(message_for_middleware_fail);
    };

    next_object();

};




// The above functions are exported. Files like 'user-routes', 'blog-routes', and 'follow-routes' can use them to protect routes.
module.exports = {check_session,reverse_check_session};