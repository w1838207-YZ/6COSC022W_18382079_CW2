// This file handles the web application's business logic, specifically the logic related to blog comments.




// Necessary imports are made. They are needed to use DAO class functions and a utility function.
const {comment_dao} = require("../DAOs/comment-dao");

const {create_response} = require("../Utilities/response-utility");




class comment_service {


    // A constructor in the service class initialises a DAO class object.
    constructor () {
        this.comment_dao = new comment_dao();
    };


    // Unfortunately, no service functions exist related to comments, due to other difficulties in this project which took up time.


};




// The service class is exported, for use by the web application's comment router.
module.exports = {comment_service};