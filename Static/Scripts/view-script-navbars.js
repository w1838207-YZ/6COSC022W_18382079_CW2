// This file is an external script for the EJS partials that define navigation bars on frontend pages.




// A function was supposed to facilitate a search by country name or author when a link with a search icon is clicked. Unfortunately it is incomplete because it rendering / correct population of search results does not work, and there were other difficulties in this project which took up time.
document.getElementById("searchbutton").addEventListener("click", async(event_object) => {


    try {

        event_object.preventDefault();

        const searched_country_name = document.getElementById("countrysearchbar").value.trim();
        const searched_author_name = document.getElementById("authorsearchbar").value.trim();

        const data_for_fetch_request = {
            "country" : searched_country_name,
            "author" : searched_author_name
        };

        const fetch_request = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data_for_fetch_request)
        };

        const fetch_response = await fetch("http://localhost:5001/blog/search",fetch_request);

        const fetch_data = await fetch_response.json();

    }


    catch (error_search) {

        alert(":(");

    };


});




// A separate sequence of steps is used to identify which navigation bar link is active and modify it for a subsequent highlight by CSS styling.
const route = window.location.pathname;

const links = document.querySelectorAll(".link");

links.forEach(link => {
    if (link.getAttribute("href")===route) {
        link.classList.add("active");
    }
    else {
        link.classList.remove("active");
    };
});