const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (options) => {

  const msg = {
    to: options.email,
    from: process.env.SENDGRID_MAIL,// Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  // const msg = {
  //   to: options.email,
  //   from: process.env.SENDGRID_MAIL,
  //   templateId: options.templateId,
  //   dynamic_template_data: options.data,
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };

  sgMail
    .send(msg)
    .then((data) => {
      console.log("Email Sent",data);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
