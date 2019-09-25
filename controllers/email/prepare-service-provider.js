const config = require('../../config');
const utility = require('../../utility');

function configureMailForSendGrid(emailData){
    return {
            url: config.sendGrid.url,
            headers: config.sendGrid.headers,
            body: {
            from: emailData.from,
            personalizations: [{
                to: emailData.to // need to bring in required format.
            }],
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: emailData.subject,   
            content: [
                {
                    type: "text/plain", 
                    value: emailData.message
                }
            ]
        },
        json: true
       
    }
}
function configureMailForMailGun(emailData){
    
    var mailGunEmailTemplate = {
          url : config.mailGun.url,
          auth: config.mailGun.auth,
          headers: config.mailGun.headers,
          formData: {
              from: utility.mailGunEmailFormatter(emailData.from),
              to: utility.mailGunEmailFormatter(emailData.to),
              subject: emailData.subject,
              text: emailData.message
          }
    }
    if ( emailData.hasOwnProperty('cc') ) {
    mailGunEmailTemplate.cc = utility.mailGunEmailFormatter(emailData.cc);
    }
    if ( emailData.hasOwnProperty('bcc') ) {
        mailGunEmailTemplate.bcc = utility.mailGunEmailFormatter(emailData.bcc);
        }
    return mailGunEmailTemplate;
}

module.exports.sendGridTemplate = configureMailForSendGrid;
module.exports.mailGunTemplate = configureMailForMailGun;
 