
var pacienteTr = document.createElement("tr");
var solicitacao = {
        descricao : "mouse",
        data : "21/03/1992",
        justificativa : "porque eu quero"
}

addSolicitacaoNaTabela(solicitacao)

function addSolicitacaoNaTabela(){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(pacienteTr);
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
