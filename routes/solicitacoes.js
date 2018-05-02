var express = require("express");
var router = express.Router();
var models = require("../models");
const LoggedIn = require("../middleware/index");

router.get("/", LoggedIn.isLoggedIn, (req, res) => {
  models.solicitacoes.findAll().then(allSolicitacoes => {
    res.render("solicitacoes/index", { _solicitacoes: allSolicitacoes });
  });
});

router.get("/adicionar", LoggedIn.isLoggedIn, (req, res) => {
  res.render("solicitacoes/adicionar");
});

router.post("/adicionar", (req, res) => {
  const solicitacao = {
    justificativa: req.body.justificativa,
    quantidade_produto: req.body.quantidade_produto,
    user_id: req.body.user.id,
    produtos: req.body.produtos,
    orcamentos: req.body.orcamentos
  };
  models.solicitacoes.create(solicitacao);
});
module.exports = router;
