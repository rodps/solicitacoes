var express = require('express');
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const isLoggedInAdm = require("../middleware/index").isLoggedInAdm;




router.get("/listar/solicitacoes", isLoggedInAdm, function (req, res) {

    models.solicitacoes.findAll({
        include: [{
            model: models.usuarios,
            where: { id: Sequelize.col('usuario_id') },

        }],
        where: {
            [Op.or]: [{ status: "APROVADO" }, { status: "DESERTO" }]
        },
    }).then(solicitacoes => {
        res.send(solicitacoes);
    });

});

router.get("/listar/solicitacoes/:id", isLoggedInAdm, function (req, res) {
    const id = req.params.id;

    models.solicitacoes.findById(id).then(solicitacao => {
        if (solicitacao) {
            res.status(200).json(solicitacao);
        } else {
            res.status(404).send('Solicitacao não encontrada.');
        }
    }).catch(ex => {
        console.error(ex);
        res.status(400).send('Não foi possível consultar a solicitacao.');
    })
    //res.send(solicitacao);
});


//---------------------------------------REQUISIÇOS--------------------------------------//



router.post("/criar/requisicoes", isLoggedInAdm, function (req, res) {
    req.isAuthenticated();
    usuario_id = req.user.id;

    models.requisicoes.create({ usuario_id: usuario_id, status: "VALIDA" }).then((_requisicao) => {
        let id_requisicao = _requisicao.id;
        let lista = []
        req.body.solicitacoes.forEach(function (item) {
            lista.push({
                requisicao_id: id_requisicao,
                solicitacao_id: item,
            })
        });
        models.solicitacao_requisicao.bulkCreate(lista).then(() => {
            res.status(201).send("Requisicão Criada");

        }).catch(ex => {
            res.status(400).send('Não foi possível associar a solicitação com a requisicão ' +
                'no banco de dados.');
        })
    }).catch(ex => {
        console.error(ex);
        res.status(400).send('Não foi possível incluir a requisicao ' +
            'no banco de dados.');
    });

    models.solicitacoes.update({
        status: "REQUISITADO",
    }, {
            where: {
                id: {
                    [Op.in]: req.body.solicitacoes
                }
            }
        }).then(() => {
            console.log('atualizado');
        })
});

router.get("/", isLoggedInAdm, function (req, res) {
    res.render("requisicoes/requisicao");
});


router.get("/listar", function (req, res) {


    models.requisicoes.findAll({
        include: [{
            model: models.usuarios,
            where: { id: Sequelize.col('usuario_id') },
            attributes: ['nome'],
        }]
    }).then(requisicoes => {

        res.send(requisicoes);
    });



});


router.get("/listar/requisicoes_solicitacoes", isLoggedInAdm, function (req, res) {
    models.solicitacao_requisicao.findAll({
        include: [{
            model: models.solicitacoes,
            where: { id: Sequelize.col('solicitacao_id') }
        }],
        where: { status: "VALIDA" }
    }).then(solicitacoes => {

        res.send(solicitacoes);
    });
});


router.get("/listar/requisicoes_solicitacoes/:id", function (req, res) {
    models.solicitacao_requisicao.findAll({
        include: [{
            model: models.solicitacoes,
            where: { id: Sequelize.col('solicitacao_id') },
            attributes: ['id', 'descricao', 'status', 'data'],
            include: [{
                model: models.usuarios,
                where: { id: Sequelize.col('usuario_id') },
                attributes: ['nome']
            }],
        }],

        where: { requisicao_id: req.params.id },

    }).then(solicitacoes => {

        res.send(solicitacoes);
    });
});


router.get("/lista/solicitacoes/:id", function (req, res) {
    res.render("verRequisicao/verRequisicao")
});

router.get("/historico", function (req, res) {
    res.render("listarRequisaicao/listRequisicao")
});

router.delete('/excluir/solicitacao/:id', function (req, res) {
    models.solicitacoes.update({
        status: "APROVADO",
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            console.log('Status ATUALIZADO');
        })

    models.solicitacao_requisicao.destroy({
        where: { solicitacao_id: req.params.id }
    }).then(() => {
        console.log('solicitacao _ requisicao remolvida');
    })
    res.status(201).send("Solicitacao remolvida");
});

// ADICIONAR SOLICITACOES EM 1 REQUISICAO JÁ EXISTENTE
router.get("/adicionar/solicitacao", function (req, res) {
    res.render("listarRequisaicao/listRequisicao")
});

router.post("/adicionar/solicitacao/:idRequisicao", function (req, res) {

    let id_requisicao = req.params.idRequisicao;
    let lista = []

    req.body.solicitacoes.forEach(function (item) {
        lista.push({
            requisicao_id: id_requisicao,
            solicitacao_id: item,
        })
    })

    models.solicitacao_requisicao.bulkCreate(lista).then(() => {
        res.status(201).send("Solicitacao adicionada a requisicao");

    }).catch(ex => {
        res.status(400).send('Não foi possível associar a solicitação com a requisicão ' +
            'no banco de dados.'
        );
    })

    models.solicitacoes.update({
        status: "REQUISITADO",
    }, {
            where: {
                id: {
                    [Op.in]: req.body.solicitacoes
                }
            }
        }).then(() => {
            console.log('atualizado');
        })

});
//---------------------------------ORÇAMENTOS SOLICITACOES-------------------------------

router.get("/listar/orcamentos/:idSolicitacao", function (req, res) {
    models.orcamentos.findAll({
        where: { solicitacao_id: req.params.idSolicitacao }
    }).then(orcamentos => {
        res.send(orcamentos);
    });


});



module.exports = router;