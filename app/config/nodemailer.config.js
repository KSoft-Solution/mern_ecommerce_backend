const nodemailer = require("nodemailer");

const sendMail = async (recipient, message) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
    secure: false,
    logger: true,
    debug: true,
    ignoreTLS: true,
    auth: {
      user: "kanhasahu955902@gmail.com",
      pass: "kanhasahu$1111",
    },
    tls: {
      ciphers: "SSLv3",
    //   rejectUnauthorized: false,
    },
    // requireTLS: true,
  });

  const data = {
    from: `KSoft Solution <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to: recipient,
    subject: `${message.subject}`,
    text: `${message.text}`,
    html: `${message.html}`,
  };
  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log("Your config is correct");
  });

  await transporter
    .sendMail(data)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};

module.exports = sendMail;
