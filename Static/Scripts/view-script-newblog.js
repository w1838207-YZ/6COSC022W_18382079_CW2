// This file is an external script for the frontend page where a user makes a new blog post.




// When the page loads a dropdown list is filled with names of all countries in the REST Countries API, by fetching from a relevant route with a HTTP Get request.
window.addEventListener("load", async(event_object) => {

    event_object.preventDefault();

    const country = document.getElementById("country");

    var options_for_select_tag = "";
    options_for_select_tag += "<option disabled selected>Select Country</option>";

    const fetch_request_for_select = {
        method : "GET",
        headers : {
            "Request-Type":"Fetch-Request"
        }
    };

    const fetch_response_for_select = await fetch("http://localhost:5001/country/names/all",fetch_request_for_select);
    const fetch_data_for_select = await fetch_response_for_select.json();
    const array_of_fetch_data = fetch_data_for_select.names;

    for (let i=0; i<array_of_fetch_data.length; i++) {
        options_for_select_tag += `<option>${array_of_fetch_data[i].name}</option>`;
    };

    country.innerHTML = options_for_select_tag;

});




// When a form submit button is clicked, a function gathers entered post details and attempts to create a blog by fetching from a relevant route with a HTTP Post request.
document.getElementById("submit").addEventListener("click", async(event_object) => {


    try {
        event_object.preventDefault();

        const title = document.getElementById("title").value.trim();
        const content = document.getElementById("content").value.trim();
        const country = document.getElementById("country").value.trim();
        const date = document.getElementById("date").value.trim();

        const data_for_fetch_request = {
            "title" : title,
            "content" : content,
            "country" : country,
            "date" : date
        };

        const fetch_request_for_post = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_fetch_request)
        };

        const fetch_response_for_post = await fetch("http://localhost:5001/blog/new",fetch_request_for_post);

        const fetch_data_for_post = await fetch_response_for_post.json();

        const message_of_fetch_data = fetch_data_for_post.message;

        alert(`${message_of_fetch_data}`);

        if (!message_of_fetch_data.includes("Error")) {
            window.location.href = "/";
        }
        else {
            window.location.href = "/blog/new";
        };

    }


    catch (error_submit) {

        alert("Error! Our app failed to create a blog post with the details provided for an unknown reason");

        window.location.href = "/blog/new";

    };


});