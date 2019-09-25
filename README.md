The app has a fairly simple structure with one endpoint `POST email/` which is responsible to send an email via using two email services i.e., send-grid and mail-gun. More services can be added as per the requirement.

# Logic

The file `send-email.js` is mainly responsible to respond to the request `POST /email`. It is also equipped to tackle the I/O errors with the help of a library called `JOI`. It is further dependent on a few other files which are listed below.      - `prepare-service-provider.js`, 
   - `./services/send-email.js`,
   - `config.js` 
   - `utility.js`

# prepare-service-provider.js
This file is responsible to format the request according to the service provider.

# /services/send-email.js
This file is comprised of two functions handleEmailRequest() & requestAccordingly(). `handleEmailRequest(mailServers)` function accepts an array of mail-service-providers and tries each option one by one until it succeeds. It further calls the function `requestAccordingly(mailServer)` which uses `request-promise` lib to perform an async request to the given mail-service-provider.

# config.js

The purpose of this file is to keep all the constant parameters such as API keys, URLs and others in one place in a decent manner. So that we don't have to be redundant while adding other functionality like delete, receive. Also, whenever we wish to change any of the API key or any other constant parameter then it can be easily done just from one file and can be reflected across the application.

# utility.js

This file holds all the utility functions of the app such as a schema-validation function for I/O, logger, and others.

# Test

Test folder has another folder test-unit which is supposed to have all the unit tests. This folder has a file called `send-email.js` which has a unit test for the `POST /email` endpoint. The test can be run as `npm test`. I couldn't complete the test but it will give an idea that it can be done this way. 


# How to run the app

First, add the required values in a file called `config.js`. Remember that it only accepts send-grid and mail-gun at the moment if you wish to enter any other please follow the same structure and also do not forget to call it in file `./controllers/email/send-email.js`.

Second, navigate to the root folder of the app and run `node app.js` on command line. Please make sure that the system has the node.js environment installed before running the above mentioned command.

Third, to run the test make sure to install all the dev dependencies (npm install --only=dev)  then run `npm test` on command line.

# Expected input
`
{
    "from" : {
        "email": "test@hotmail.com",
        "name" : "Mr. ABC"
    },
    "to" : [{
        "email": "test@gmail.com",
        "name" : "MR. XYZ"
    }
    ],
    cc: [{same as to}],
    bcc: [{same as to}],
    "subject": "Test email",
    "message": "Heya! test time."

}
 `





