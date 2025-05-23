// This file is an external script for the frontend page where a user logs out of an existing account.




// When a user confirms logging out, a function attempts to do so by fetching from a relevant route with a HTTP Post request.
document.getElementById("yes").addEventListener("click", async(event_object) => {

    event_object.preventDefault();

    const fetch_request = {
        method : "POST"
    };

    const fetch_response = await fetch("http://localhost:5001/user/logout",fetch_request);

    const fetch_data = await fetch_response.json();

    const success_in_fetch_data = fetch_data.success_logout;

    if (success_in_fetch_data) {
        alert("No errors here, you've successfully logged out, thank you so much for using our app~");
        window.location.href = "/user/login";
    }

    else {
        alert("Error! Our app failed to log out of your user account for an unknown reason");
    };    

});




// When a user declines logging out, they keep their login session and are redirected to the home page.
document.getElementById("no").addEventListener("click", async(event_object) => {

    event_object.preventDefault();

    alert("No errors here, you're still logged into your account~");

    window.location.href = "/";

});