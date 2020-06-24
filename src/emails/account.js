const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'Joe@rentcentric.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. let me know how you get along with the app`
    })
}

const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'Joe@rentcentric.com',
        subject: 'Sorry to see you go',
        text: `Sorry for you are leaving, ${name}. Was there anything we could do to improve your experience`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
