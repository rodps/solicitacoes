var xhr = new XMLHttpRequest();
var solicitacaoTr = document.createElement("tr");


xhr.open("GET", "http://localhost:3000/siorg/listar"); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    
    });
})
xhr.send();


var btdCarregar = document.getElementById("consultarBotao");

    btdCarregar.addEventListener("click",function(){
       
        

        var descricao = document.getElementById("descricao-consulta").value
        
        if(descricao.length > 0){
           console.log(descricao)
        }
        else{
            alert("Digite uma breve descrição do material")
            }

})

function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    
    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.siorg,         "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.descricao,    "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.data,       "info-status"       ));
    

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
