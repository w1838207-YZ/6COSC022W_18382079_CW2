// This file is an external script for the frontend page where a user signs into an existing account.




// When a form submit button is clicked, a function gathers entered credentials and attempts to log in by fetching from a relevant route with a HTTP Post request.
document.getElementById("submit").addEventListener("click", async(event_object) => {


    try {

        event_object.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const data_for_fetch_request = {
            "email" : email,
            "password" : password
        };

        const fetch_request = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_fetch_request)
        };

        const fetch_response = await fetch("http://localhost:5001/user/login",fetch_request);

        const fetch_data = await fetch_response.json();

        const message_of_fetch_data = fetch_data.message;
        
        alert(`${message_of_fetch_data}`);

        if (!message_of_fetch_data.includes("Error")) {
            window.location.href = "/";
        }
        else {
            window.location.href = "/user/login";
        };

    }


    catch (error_submit) {

        alert("Error! Our app failed to log into an existing account with the credentials provided for an unknown reason");

        window.location.href = "/user/login";

    };


});