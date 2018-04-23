var solicitacaoTr = document.createElement("tr");

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/teste.json"); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
        console.log(solicitacao)
        addSolicitacaoNaTabela(solicitacao);
    });
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
 
    solicitacaoTr.appendChild(montaTd(solicitacao.nome, "info-descricao"));
    solicitacaoTr.appendChild(montaTd(solicitacao.data,    "info-data"));
    solicitacaoTr.appendChild(montaTd(solicitacao.status,  "info-status"));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitante,  "info-solicitante"));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
