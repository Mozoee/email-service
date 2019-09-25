module.exports = {
    sendGrid : {
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            "Authorization": "Bearer xxxx--xxx--xxxx--xxx",
        },
    },
    mailGun : {
        url: 'https://api.mailgun.net/v3/sandboxfb096576c2504d7c858b60e29c5136da.mailgun.org/messages',
        auth: {
            'username': 'api',
            'password' : 'xxxx--xxx--xxxx--xxx'
        },
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
    }
}