var xhr = new XMLHttpRequest();
var ajax = new XMLHttpRequest();


ajax.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/teste.json"); //tipo de requisição + end.
ajax.addEventListener("load", function(){
    var sol = JSON.parse(ajax.responseText);
    addLabel(sol)
    var Idlb = document.getElementById("IdShowRequisicao").innerHTML += sol.id
})
ajax.send()

xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/orcamento.json"); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    });
})
xhr.send();

function addLabel(sol){
    
    let qtdLb = document.getElementById("quantidadeSolicitacao").value = sol.quantidade
    document.getElementById("quantidadeSolicitacao").readOnly = true

    let descricaoLb = document.getElementById("descricaoSolicitacao").value = sol.descricao
    document.getElementById("descricaoSolicitacao").readOnly = true
    
    let justLb = document.getElementById("justificativaSolicitacao").value = sol.justificativa
    document.getElementById("justificativaSolicitacao").readOnly = true

    let nomeLb = document.getElementById("solicitanteSolicitacao").value = sol.usuario.nome
    document.getElementById("solicitanteSolicitacao").readOnly = true

    let statusLb = document.getElementById("statusSolicitacaol").value = sol.usuario.status
    console.log(statusLb)
    document.getElementById("statusSolicitacaol").readOnly = true

}


function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
    
    solicitacaoTr.appendChild(montaTd(solicitacao.valor,                    "info-valor"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.origem,                   "info-origem"      ));
    solicitacaoTr.appendChild(montaTd(solicitacao.cnpj_forncedor,           "cnpj_forncedor"      ));
    solicitacaoTr.appendChild(montaTd(solicitacao.nome_fornecedor,  "info-nome_fornecedor" ));
    
    solicitacaoTr.appendChild(montaTd(solicitacao.id,                       "info-id"           ));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

