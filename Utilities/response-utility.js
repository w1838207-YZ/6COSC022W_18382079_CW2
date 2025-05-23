// This file facilitates custom response formats within the web application.




// A function generates a specialised response. In JSON form, it can store success, code, data, and error values.
const create_response = async(success,code=null,data=null,error=null) => {

    return {
        success,
        code,
        data,
        error:error?.message||error
    };

};




// The custom response is exported. It is used consistently throughout the web application.
module.exports = {create_response};