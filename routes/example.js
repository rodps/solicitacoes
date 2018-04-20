var express = require('express');
var router  = express.Router();
var models  = require("../models");

router.get("/example", function(req, res) {
	res.send("Example route")
});

module.exports = router;