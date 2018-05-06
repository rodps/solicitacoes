var listRequisicao = []
var idSolicitacao
var statusSolicitacao
var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();
var btdCarregar
var getId = new XMLHttpRequest();
var idRequisicao

idRequisicao = window.location.pathname
var pos = idRequisicao.split("/")

xhr.open("GET", "http://localhost:3000/requisicoes/listar/requisicoes_solicitacoes/" + pos[4]); //tipo de requisição + end.
//xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/VerSolicitacao.json"); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
});
})
xhr.send();

var idRequisicao = document.getElementById("viewReq").innerHTML += pos[4]

var tabela = document.querySelector("table");
tabela.addEventListener("dblclick", function(event){  
    var row = event.target.parentNode
    var row = event.target.parentNode
    idSolicitacao = row.lastChild.textContent
    window.location.href = "????"+idSolicitacao
});

///////////////////////////
function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    
    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.data,                     "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.descricao,     "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.status,        "info-status"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.usuario.nome,           "info-solicitante"  ));
    
    solicitacaoTr.appendChild(montaTd(solicitacao.id,                        "info-id"));
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
