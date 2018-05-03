
var listRequisicao = []
var idSolicitacao

var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:3000/requisicoes/listar/solicitacoes"); //tipo de requisição + end.

xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
        addSolicitacaoNaTabela(solicitacao);
    });
})

xhr.send();

var tabela = document.querySelector("table");
tabela.addEventListener("click", function(event){  
    idSolicitacao = event.target.parentNode.lastChild.textContent
    if(!listRequisicao.includes(idSolicitacao)){
        listRequisicao.push(idSolicitacao)    
    }
    else{
        listRequisicao.pop(idSolicitacao)    
    }
    console.log(listRequisicao)
    //setTimeout(function(){
    //    event.target.parentNode.remove(); //pega campo do duplo click e elimina o pai , fazendo assim apagar a linha
    //},300);
});


var btdCarregar = document.querySelector("#newRequisicao");

    
    btdCarregar.addEventListener("click",function(){
        var json = JSON.stringify({"solicitacoes" : listRequisicao});
        console.log(json)
        
        var ajax = new XMLHttpRequest()
        ajax.open("POST", "http://localhost:3000/requisicoes/criar/requisicoes", true)
        ajax.setRequestHeader('Content-type','application/json; charset=utf-8');
         ajax.send(json)

})



///////////////////////////
function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);
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