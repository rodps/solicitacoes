var xhr = new XMLHttpRequest();
var ajax = new XMLHttpRequest();

xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/teste.json",false); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    addLabel(sol)
})
xhr.send();

ajax.open("GET", "http://localhost:3000/requisicoes/listar/solicitacoes"); //tipo de requisição + end.
ajax.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    });
})
xhr.send();

function addLabel(sol){
    
    let descricaoLb = document.getElementById("descricaoSolicitacao").value = sol.descricao
    let qtdLb = document.getElementById("quantidadeSolicitacao").value = sol.quantidade
    let justLb = document.getElementById("justificativaSolicitacao").value = sol.justificativa
    let nomeLb = document.getElementById("solicitanteSolicitacao").value = sol.usuario.nome
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
 
    solicitacaoTr.appendChild(montaTd(solicitacao.data,         "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.descricao,    "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.status,       "info-status"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.usuario.nome, "info-solicitante"  ));
    
    solicitacaoTr.appendChild(montaTd(solicitacao.id,           "info-id"           ));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function getStatus(event){
    if(event.childNodes[2].textContent == "ABERTO"){
        return true
    }
    return false
}
