
var solicitacaoTr = document.createElement("tr");


var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/requisicao/listarSolicitacao"); //tipo de requisição + end.
xhr.addEventListener("load", function(){

    var solicitacao = JSON.parse(xhr.responseText);
    solicitacao.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    });
    console.log(JSON.parse(xhr.responseText));
})

xhr.send();

function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);
}

function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.descricao, "info-descricao"));
    solicitacaoTr.appendChild(montaTd(solicitacao.data,    "info-data"));
    solicitacaoTr.appendChild(montaTd(solicitacao.justificativa,  "info-justificativa"));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}