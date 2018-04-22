
var solicitacaoTr = document.createElement("tr");
/*
var solicitacao = {
        descricao : "mouse",
        data : "21/03/1992",
        justificativa : "porque eu quero"
}
*/

var xhr = new XMLHttpRequest();
xhr.open("GET", "localhost:3000/requisicao"); //tipo de requisição + end.
xhr.addEventListener("load", function(){

    var pacientes = JSON.parse(xhr.responseText);
    pacientes.forEach(function(paciente) {
        addPacienteNaTabela(paciente);
    });
})
     

addSolicitacaoNaTabela(solicitacao)

function addSolicitacaoNaTabela(){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);
}

function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    pacienteTr.appendChild(montaTd(solicitacao.descricao, "info-descricao"));
    pacienteTr.appendChild(montaTd(solicitacao.data,    "info-data"));
    pacienteTr.appendChild(montaTd(solicitacao.justificativa,  "info-justificativa"));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
