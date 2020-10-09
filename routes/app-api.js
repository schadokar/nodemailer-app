const router = require("express").Router();

// render ejs send email
router.get("/", (req, res) => {
  res.render("send-mail", {
    message: req.query.message,
    status: req.query.status,
  });
});

module.exports = router;
