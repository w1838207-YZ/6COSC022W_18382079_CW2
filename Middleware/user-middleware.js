// This file restricts a HTTP Post route (in 'user-routes') to only processing fully if a user chooses from the frontend to follow/unfollow another user.




// A function brings about failure if a header doesn't exist which indicates a specific reason why a user record is being updated (to gain/lose a follower or to start/stop a following).
const check_purpose = async(request_object,response_object,next_object) => {

    const view_script_header = request_object.header("Update-Purpose");

    if (!view_script_header) {
        const message_for_middleware_fail = { message : "Error! Our app did not receive context properly for what to update on a user account's profile" };
        return response_object.status(428).json(message_for_middleware_fail);
    };

    next_object();

};




// The above function is exported. Other files, namely 'user-routes' can use it to protect routes.
module.exports = {check_purpose};