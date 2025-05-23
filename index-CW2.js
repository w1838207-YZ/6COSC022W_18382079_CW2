// This file is the starting point of the web application.




// Necessary imports are made to packages. They are needed to make a web server, locate static assets, create sessions, and use environment variables.
const express = require("express");

const path = require("path");

const session = require("express-session");

const dotenv = require("dotenv");




// The web application from here can make use of environment variables. An express instance is created, to represent said app.
dotenv.config();

const app = express();




// The web application can now handle JSON data, will use Embedded JavaScript as its templating engine, and now knows where to find page views and static assets.
app.use(express.json());

app.set("view engine","ejs");

app.set("views","./Views");

app.use(express.static(path.join(__dirname,"Static")));




// The web application can now make use of sessions which last for 24 hours. Most notably, the key that signs a session to prevent tampering now comes from an environment variable.
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure:false,
        httpOnly:true,
        maxAge:1000*60*60*24
    }
}));




// The web application is now compatible with routers, which group together routes that pertain to a common theme (for better organisation).
const {user_router} = require("./Routes/user-routes");
app.use("/user", user_router);

const {blog_router} = require("./Routes/blog-routes");
app.use("/blog", blog_router);

const {comment_router} = require("./Routes/comment-routes");
app.use("/comment", comment_router);

const {follow_router} = require("./Routes/follow-routes");
app.use("/follow", follow_router);

const {country_router} = require("./Routes/country-routes");
app.use("/country", country_router);




// One route is described here, for the landing page of the web application. The specific page displayed depends on whether a current user is signed in.
app.get("/", async(request_object,response_object) => {
    if (request_object.session.isAuthenticated) {
        response_object.render("Pages/home-signed");
    }
    else {
        response_object.render("Pages/home-unsigned");
    };
});



// The web application listens for user requests on a port, whose number is determined by another environment variable.
const port_number = process.env.LISTEN_PORT;

app.listen(port_number, () => {
    console.log("│\n│\n├── The server for our 'TravelTales' coursework web application started successfully~");
})
.on("error", function(error_listen) {
    if (error_listen.code==="EADDRINUSE") {
        console.log("│\n│\n└── Error! A chosen port, ", port_number ,", is currently occupied by another process");
    }
    else {
        console.log("│\n│\n└── Error! Our web application server failed to begin due to an unknown reason");
    };
});