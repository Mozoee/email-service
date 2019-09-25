const rp = require('request-promise');
const utility = require('../utility');


function requestAccordingly(mailServer){
    return new Promise((resolve) => {
       rp.post(mailServer)
        .then(() => {
            resolve(true);
       })
        .catch(error => {
            utility.log.debug(error);
            resolve(error);
        }); 
    });     
}

function handleEmailRequest(mailServers) {
    return new Promise(async (resolve, reject) =>{
        if(mailServers.length > 0){
           try {
               for(mailServer in mailServers){
                    let mailSent = await requestAccordingly(mailServers[mailServer]);
                    if (mailSent === true) {
                        resolve(mailSent);
                        break;
                    }else if(mailSent.name === 'StatusCodeError' && mailServer == mailServers.length-1){
                        throw new Error('Email services not working');
                    }

               }
           } catch (error) {
               reject(error);
           }
        }else{
            var errMsg = 'No email service providers were found';
            utility.log.info(errMsg);
            reject(new Error(errMsg));
        }
    });

   
}

module.exports.handleEmailRequest = handleEmailRequest;