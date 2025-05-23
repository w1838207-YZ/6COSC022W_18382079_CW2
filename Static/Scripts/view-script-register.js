// This file is an external script for the frontend page where a user signs up for a new account.




// When a form submit button is clicked, a function gathers entered credentials and attempts to create a new account record by fetching from a relevant route with a HTTP Post request.
document.getElementById("submit").addEventListener("click", async(event_object) => {


    try {

        event_object.preventDefault();

        const forename = document.getElementById("forename").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirm = document.getElementById("confirm").value.trim();

        const data_for_fetch_request = {
            "forename" : forename,
            "surname" : surname,
            "email" : email,
            "password" : password,
            "confirm" : confirm
        };

        const fetch_request = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_fetch_request)
        };

        const fetch_response = await fetch("http://localhost:5001/user/register",fetch_request);

        const fetch_data = await fetch_response.json();

        const message_of_fetch_data = fetch_data.message;
        
        alert(`${message_of_fetch_data}`);

        if (!message_of_fetch_data.includes("Error")) {
            window.location.href = "/user/login";
        }
        else {
            window.location.href = "/user/register";
        };

    }


    catch (error_submit) {

        alert("Error! Our app failed to register a new account with the credentials provided for an unknown reason");

        window.location.href = "/user/register";

    };


});