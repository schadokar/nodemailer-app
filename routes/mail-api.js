const express = require("express");
const router = express.Router();
const sendMailMethod = require("../src/send-mail");
const querystring = require("querystring");
require("dotenv").config();

// Post request to send an email
router.post("/sendmail", async (req, res) => {
  try {
    const email_to_raw = process.env.MAIL_RECIPIENT
    const email_to = email_to_raw.split(',');

    let email_request = {}
    email_request["to"] = email_to
    email_request["from"] = req.body["from"]
    email_request["subject"] = req.body["subject"]
    email_request["message"] = req.body["message"]

    const result = await sendMailMethod(email_request);

    // build the query
    const query = querystring.encode({
      message: result,
      status: true,
    });
    res.redirect("/?" + query);
  } catch (error) {
    console.error(error.message);

    // build the error query
    const query = querystring.encode({
      message: "Unable to send the message.",
      status: false,
    });
    res.redirect("/?" + query);
  }
});

module.exports = router;
