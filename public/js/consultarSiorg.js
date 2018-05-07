var xhr = new XMLHttpRequest();
var solicitacaoTr = document.createElement("tr");

xhr.open("GET", "http://localhost:3000/siorg/listar"); //tipo de requisição + end.
//xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/siorg.json"); //tipo de requisição + end.

xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    
    });
})
xhr.send();

var campoFiltro = document.querySelector("#descricao-consulta");
campoFiltro.addEventListener("input", function() {
    var siorg = document.querySelectorAll(".solicitacao");
    if (this.value.length > 0) {
        for (var i = 0; i < siorg.length; i++) {
            var  desSiog = siorg[i];
            var tdDesc = desSiog.querySelector(".info-descricao");
            var des = tdDesc.textContent;
            var expressao = new RegExp(this.value, "i");
            
            if (!expressao.test(des)) {
                desSiog.classList.add("invisivel");
            } else {
                desSiog.classList.remove("invisivel");
            }
            console.log(expressao)
        }
    }
    else {
        for (var i = 0; i < siorg.length; i++) {
            var desSiog = siorg[i];
            desSiog.classList.remove("invisivel");
        }
    }

})


///////////////
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
