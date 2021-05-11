const nodemailer = require("nodemailer");

var sgTransport = require("nodemailer-sendgrid-transport");

async function sendsEmail(options) {
  const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.API_KEY,
      },
    })
  );

  // send mail with defined transport object
  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s");
}

module.exports.sendsEmail = sendsEmail;
