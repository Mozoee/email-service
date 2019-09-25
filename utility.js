const Joi = require('joi');
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'Email API', level: 'debug' });

function mailGunEmailFormatter(emailObject){
    var emailCommaSeparated = '';
    if(emailObject !== undefined && Object.keys(emailObject).length > 0){
    if (Array.isArray(emailObject)) {
        emailObject.forEach((emailObject_, index) => {
        if (index > 0) {
            emailCommaSeparated += ',';
        }
          let email = emailObject_.name + ' <' + emailObject_.email + '>';
           emailCommaSeparated +=  email;
        });
        
    }else{
        emailCommaSeparated = emailObject.name + ' <' + emailObject.email + '>';
    }
    return emailCommaSeparated;
}
}

function validateSchema(value, schema, options) {
    return new Promise((resolve, reject) => {
      Joi.validate(value, schema, options, (err, value_) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(value_);
        }
      });
    });
  }


module.exports.mailGunEmailFormatter = mailGunEmailFormatter;
module.exports.validateSchema = validateSchema;
module.exports.log = log;