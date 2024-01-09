"use strict";
require("dotenv").config();
const { constants } = require("buffer");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require("path");
/**
 * sendEmail
 * @param {Object} mailObj - Email information
 * @param {String} from - Email address of the sender
 * @param {Array} to - Array of receipents email address
 * @param {String} subject - Subject of the email
 * @param {String} text - Email body
 */
const sendEmail = async (mailObj) => {
  const { from, to, subject, message } = mailObj;

  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_DOMAIN,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const templatePath = path.resolve(__dirname, "../template/mail.html")
    let templateData = {
      welcomeMessage: "Hello!",
      requestBody: message
    }

    let templateRendered = ""

    ejs.renderFile(templatePath, templateData, {}, (err, str) => {
      if (err) {
        console.error(err);
      } else {
        templateRendered = str // Output: Rendered HTML content
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: String(message), // plain text body
      html: templateRendered, // html body
    });

    // console.log(`Message sent: ${info.messageId}`);
    return `Mail successfully sent with id: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

module.exports = sendEmail;
