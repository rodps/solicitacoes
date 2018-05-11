var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
	models.solicitacoes.findAll().then((solicitacoes) => {
		res.render("solicitacoes", {solicitacoes: solicitacoes});
	});
});

router.post("/", (req, res) => {
	models.solicitacoes.create(req.body).then(() => {
		res.redirect("/solicitacoes");
	});
});

router.get("/new", (req, res) => {
	res.render("solicitacoes/nova_solicitacao");
});

router.get("/:id", (req, res) => {
	models.solicitacoes.findById(req.params.id).then((solicitacao) => {
		res.render("solicitacoes/ver_solicitacao", {solicitacao: solicitacao});
	});
});

module.exports = router;