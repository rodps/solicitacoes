var express = require("express");
var router = express.Router();
var models = require("../models");
const isLoggedIn = require("../middleware/index").isLoggedIn;

router.get("/adicionar", function (req, res) {
    res.render("siorg/adicionarSiorg")
});

router.get("/consultar", function (req, res) {
    res.render("siorg/consultarSiorg")
});

router.get("/listar", function (req, res) {
    models.produtos_siorg.findAll().then (siorg =>{
        res.send(siorg)
    }).catch(ex => {
            res.status(400).send('Não foi possível buscar siorg  ' +
                'no banco de dados.');
        })
});

router.post("/adicionar", function (req, res) {
    models.produtos_siorg.create({ siorg : req.body.siorg , descricao : req.body.descricao }).then (siorg => {
         res.status(201).send("inserido com sucesso")
    }).catch(ex => {
            res.status(400).send('Não foi possível inserir  ' +
                'no banco de dados.');
        })
   
});

module.exports = router;
