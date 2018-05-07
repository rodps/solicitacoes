var listRequisicao = []
var idSolicitacao
var statusSolicitacao
var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();
var btdCarregar
var getId = new XMLHttpRequest();
var idRequisicao
var requisicaoId;

idRequisicao = window.location.pathname
var pos = idRequisicao.split("/")
var requisicaoId = pos[4]


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
    idSolicitacao = row.lastChild.textContent
    window.location.href = "http://localhost:3000/solicitacoes/show/" + idSolicitacao
});

var btn = document.getElementById("addRequisicao")
    btn.addEventListener("click",function(event){
        window.location.href = "http://localhost:3000/requisicoes/adicionar/sol/req/" + requisicaoId
})


///////////////////////////
function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    
    tabela.appendChild(solicitacaoTr);
    
    var botao = document.getElementById("close"+ solicitacao.solicitaco.id)
    botao.addEventListener("click",function(event){

    console.log(event.target.solicitacao)
    let id = event.target.solicitacao
    console.log(id);
    
    var json = JSON.stringify(id);
    var ajax = new XMLHttpRequest()
    ajax.open("DELETE", "http://localhost:3000/requisicoes/excluir/solicitacao/"+ id, true)
    ajax.setRequestHeader('Content-type','application/json; charset=utf-8');
    ajax.send()
    window.location.reload()
    
})

    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.data,                     "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.descricao,     "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.status,        "info-status"       ));

    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.usuario.nome,  "info-solicitante"  ));

    solicitacaoTr.appendChild(montaButton(solicitacao.solicitaco.id))
    solicitacaoTr.appendChild(montaTd(solicitacao.solicitaco.id,                        "info-id"));
    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
function montaButton(id){
    var btn = document.createElement("Button");
    var lbl = document.createTextNode("X");        
    btn.appendChild(lbl); 
   
    btn.classList.add("info-close")
    btn.id = "close" + id 
    btn.solicitacao = id
    var td = document.createElement("td");
    td.appendChild(btn)
    return td;
}

function getStatus(event){
    if(event.childNodes[2].textContent == "ABERTO"){
        return true
    }
    return false
}

function close(){
        
}