var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
	models.solicitacoes.findAll().then((solicitacoes) => {
		res.render("solicitacoes", {solicitacoes: solicitacoes});
	});
});

router.post("/", (req, res) => {
	models.solicitacoes.create(req.body)
	.then((solicitacao) => {
		res.redirect("/solicitacoes/" + solicitacao.id + "/orcamentos/edit");
	});
});

router.get("/new", (req, res) => {
	res.render("solicitacoes/nova_solicitacao");
});

router.get("/:id", (req, res) => {
	models.solicitacoes
	.findById(req.params.id)
	.then(solicitacao => {
		models.orcamentos
		.findAll({
			where: {solicitacao_id: req.params.id}
		})
		.then(orcamentos => {
			res.render("solicitacoes/ver_solicitacao", {solicitacao: solicitacao, orcamentos: orcamentos});	
		});
	});
});

router.get("/:id/orcamentos/edit", (req, res) => {
	models.orcamentos
	.findAll({
		where: {solicitacao_id: req.params.id}
	})
	.then(orcamentos => {
		res.render("solicitacoes/orcamentos", {orcamentos: orcamentos, solicitacao_id: req.params.id});
	});
});

router.post("/:id/orcamentos", (req, res) => {
	var orcamentos =  req.body;
	models.orcamentos
		.destroy({
			where: {solicitacao_id: req.params.id}
		})
		.then(() => {
			orcamentos.forEach((orcamento) => {
				models.orcamentos.create({
					origem: orcamento.ref,
					valor: orcamento.valor,
					cnpj_fornecedor: orcamento.cnpj_fornecedor,
					nome_fornecedor: orcamento.nome_fornecedor,
					solicitacao_id: req.params.id
				})
			})
		})
		.then(() => {
			res.redirect("/solicitacoes/" + req.params.id + "/orcamentos");
		});
});

module.exports = router;