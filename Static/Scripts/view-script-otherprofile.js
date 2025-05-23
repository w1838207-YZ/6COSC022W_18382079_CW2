// This file is an external script for the frontend page where a user views another user's profile.




// A function attempts to act as a skeleton with which to perform fetches.
async function perform_fetch(fetch_URL,fetch_options) {

    const fetch_response = await fetch(fetch_URL,fetch_options);
    const data_of_fetch_response = await fetch_response.json();
    const message_of_fetch_data = data_of_fetch_response.message;

    if (!fetch_response.ok) {
        throw new Error(message_of_fetch_data);
    };

    return message_of_fetch_data;

};




// When the page loads a function blocks a user from a follow button if they are already following the viewed profile, by gathering ID values and fetching from a relevant route with a HTTP Get request.
window.addEventListener("load", async(event_object) => {


    try {

        event_object.preventDefault();

        const your_ID = document.getElementById("yourID").value.trim();
        const their_ID = document.getElementById("theirID").value.trim();
        const follow = document.getElementById("follow");
        const unfollow = document.getElementById("unfollow");

        const data_for_request_CONFLICT = {
            ID_1 : your_ID,
            ID_2 : their_ID
        };

        const fetch_request_CONFLICT = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_request_CONFLICT)
        };

        const fetch_response_CONFLICT = await fetch("http://localhost:5001/follow/conflict",fetch_request_CONFLICT);
        const fetch_data_CONFLICT = await fetch_response_CONFLICT.json();
        const fetch_message_CONFLICT = fetch_data_CONFLICT.message;

        if (fetch_message_CONFLICT.includes("You're currently already following")) {
            follow.disabled = true;
            unfollow.disabled = false;
        }

        else {
            follow.disabled = false;
            unfollow.disabled = true;
        };

    }


    catch (error_load) {};


});




// When a follow button is clicked, a function gathers entered ID values and attempts to modify the two users' followers/followings values by fetching from a relevant route with a HTTP Post request. Unfortunately, it does not perform as expected because the 3 necessary fetches fail to all run successfully/properly.
document.getElementById("follow").addEventListener("click", async(event_object) => {


    try {

        event_object.preventDefault();

        const your_ID = document.getElementById("yourID").value.trim();
        const their_ID = document.getElementById("theirID").value.trim();

        const data_for_request_ONE = {
            given_ID : your_ID
        };
        const data_for_request_TWO = {
            given_ID : their_ID
        };
        const data_for_request_THREE = {
            ID_1 : your_ID,
            ID_2 : their_ID
        };

        const fetch_request_ONE = {
            method : "POST",
            headers : {
                "Update-Purpose":"Add-Following",
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_request_ONE)
        };
        const fetch_request_TWO = {
            method : "POST",
            headers : {
                "Update-Purpose":"Add-Follower",
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_request_TWO)
        };
        const fetch_request_THREE = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_request_THREE)
        };

        var fetch_message_FOLLOWING = "";
        var fetch_message_FOLLOWER = "";
        var fetch_message_FOLLOW = "";

        try {
            fetch_message_FOLLOW = await perform_fetch("http://localhost:5001/follow/create",fetch_request_THREE);
            fetch_message_FOLLOWING = await perform_fetch("http://localhost:5001/user/profile",fetch_request_ONE);
            fetch_message_FOLLOWER = await perform_fetch("http://localhost:5001/user/profile",fetch_request_TWO);
        }

        catch (error_fetch) {
            throw new Error(error_fetch.message);
        };

        alert(fetch_message_FOLLOW);

        window.location.href = "/user/profile/self";

    }


    catch (error_follow) {

        alert(error_follow.message);

        window.location.href = "/user/profile/self";

    };


});




// A function was supposed to modify two users' followers/followings values when a user profile is unfollowed. Unfortunately it is incomplete because there were other difficulties in this project which took up time.
document.getElementById("unfollow").addEventListener("click", async(event_object) => {


    try {

        event_object.preventDefault();

        alert("TEST unfollow");

    }


    catch (error_unfollow) {};


});