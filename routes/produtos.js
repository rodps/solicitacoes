var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  models.produtos.findAll().then(allProdutos => {
    res.render("produtos/index", { _produtos: allProdutos });
  });
});

router.get("/adicionar", (req, res) => {
  res.render("produtos/adicionar");
});

router.post("/adicionar", (req, res) => {
  const produto = {
    nome: req.body.nome,
    cod_siorg: req.body.cod_siorg,
    descricao_siorg: req.body.descricao_siorg,
    categoria: req.body.categoria,
    condicao: "inapto"
  };
  models.produtos.create(produto);
  res.redirect("/produtos");
});

router.get("/:id/remover", (req, res) => {
  models.produtos.destroy({
    where: {
      id: req.params.id
    }
  });
  res.redirect("/produtos");
});

router.get("/:id/editar", (req, res) => {
  models.produtos.findById(req.params.id).then(_produto => {
    res.render("produtos/editar", { produto: _produto });
  });

  router.post("/:id/editar", (req, res) => {
    models.produtos.find({ where: { id: req.params.id } }).then(_produto => {
      _produto.update({
        nome: req.body.nome,
        cod_siorg: req.body.cod_siorg,
        descricao_siorg: req.body.descricao_siorg,
        categoria: req.body.categoria,
        condicao: req.body.condicao
      });
    });
    res.redirect("/produtos");
  });
});

module.exports = router;
