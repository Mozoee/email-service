const Joi = require('joi');
const utility = require('../../utility');
const serviceProvider = require('./prepare-service-provider');
const emailService = require('../../services/send-email');

const REQUEST_BODY_SCHEMA = Joi.object().keys({ 
    from: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).optional(),
    }),
    to: Joi.array().min(1).items(Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).optional(),
    })),
    cc: Joi.array().items(Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).optional(),
    })).optional(),
    bcc: Joi.array().items(Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).optional(),
    })).optional(),
    subject: Joi.string(),
    message: Joi.string(),
});

function sendEmail(request, response){
    return utility.validateSchema(request.body, REQUEST_BODY_SCHEMA)
    .then((validBody) => {
     var mailServers = [
         serviceProvider.sendGridTemplate(validBody), 
         serviceProvider.mailGunTemplate(validBody)
        ];
     return emailService.handleEmailRequest(mailServers);
 }).then(() => {
        utility.log.info('Email sent');
        response.status(200).send('Email sent');
 })
 .catch(error =>{
    // console.log('Final error! ', JSON.stringify(error, null, 4));
     if(error.hasOwnProperty('details')){
        response.status(404).send(error.details[0].message);
     }else{
        response.send(error.message); 
     }
     
 });

}

module.exports.sendEmail = sendEmail;