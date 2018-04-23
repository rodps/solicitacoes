var express = require('express');
var router  = express.Router();
var models  = require("../models");

router.get("/", function(req, res) {
	res.render("requisicao")
});
module.exports = router;