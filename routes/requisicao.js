var express = require('express');
var router  = express.Router();
var models  = require("../models");
var Sequelize = require ("sequelize");
const Op = Sequelize.op;

router.get("/listarSolicitacao", function(req, res) {    
   models.solicitacoes.findAll().then(solicitacoes => {
        res.send(solicitacoes); 
        //res.render("requisicao", {solicitacoes: solicitacoes});	
	})
router.get("/", function(req, res) {    
        res.render("requisicao");	
	})
    
});
module.exports = router;