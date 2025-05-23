// This file protects REST Countries API data from being accessed by entering a route as a URL in a browser.




// A function brings about failure if a header doesn't exist which indicates that a request is coming from a fetch function within the web application.
const check_fetched = async(request_object,response_object,next_object) => {

    const view_script_header = request_object.header("Request-Type");

    if ((!view_script_header)||(view_script_header!="Fetch-Request")) {
        const message_for_middleware_fail = { message : "Error! Our app does not reveal sensitive data from the REST Countries API over a URL" };
        return response_object.status(406).json(message_for_middleware_fail);
    };

    next_object();

};




// The above function is exported. Other files, namely 'country-routes' can use it to protect routes.
module.exports = {check_fetched};