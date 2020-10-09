const express = require("express");
const router = express.Router();
const sendMailMethod = require("../src/send-mail");
const querystring = require("querystring");

// Post request to send an email
router.post("/sendmail", async (req, res) => {
  try {
    const result = await sendMailMethod(req.body);

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
