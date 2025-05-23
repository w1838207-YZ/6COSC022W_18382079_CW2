// This file facilitates encryption-base functionalities for the web application.




// A necessary import is made to a package, needed for functions that encrypt via hashing or compare hash values.
const bcrypt = require("bcrypt");




// One function can salt and then hash a string value. This lets user passwords be stored, in a way that avoids storing plaintext passwords, and further protects them from rainbow table attacks.
const generate_hash = async(string_input) => {

    const salt_rounds = 10;

    const salt = await bcrypt.genSalt(salt_rounds);

    const salted_and_hashed = await bcrypt.hash(string_input,salt);

    return salted_and_hashed;

};




// Another function can return whether two hash values are the same. This is useful for checking if input passwords are correct (i.e. the verification part of authentication), bearing in mind how password hashes are stored in the web application's database.
const verify_password = async(input_password,database_password) => {

    const matching = await bcrypt.compare(input_password,database_password);

    return matching;

};




// The above functions are exported. Files can use them, like the user service when a user tries to log in.
module.exports = {generate_hash,verify_password};