// This file establishes a connection between the Node JS web application and its database.




// A necessary import is made to a package, needed for connecting with and querying databases.
const sqlite3 = require("sqlite3");




// A function creates a pool/collection of open connections to databases (only to the web application's database in this case).
const connection_pool = new sqlite3.Database("Databases/my-database-cw2.db", () => {
    console.log("└── The TravelTales web app also successfully connected to our database~");
})
.on("error", function(error_connect) {
    console.log("└── Error! Our web app failed to connect to a database due to an unknown reason");
});




// The pool object is exported. Files like DAO class files can import it to gain database access.
module.exports = {connection_pool};