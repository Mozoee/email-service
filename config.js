module.exports = {
    sendGrid : {
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            "Authorization": "Bearer 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",
        },
    },
    mailGun : {
        url: 'https://api.mailgun.net/v3/sandboxfb096576c2504d7c858b60e29c5136da.mailgun.org/messages',
        auth: {
            'username': 'api',
            'password' : '87fc7389bf2e300522fd723866bc5bfa-bbbc8336-80eae809'
        },
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
    }
}