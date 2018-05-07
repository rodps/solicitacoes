

var btdCarregar = document.getElementById("botaoConfirmaSiorg");

    btdCarregar.addEventListener("click",function(){
       
        
        var codigo = document.getElementById("formGroupExampleInput").value

        var descricao = document.getElementById("descricao").value
        
        if(codigo.length > 0 && descricao.length > 0 ){
            var json = JSON.stringify({"siorg": codigo ,"descricao":descricao});
            var ajax = new XMLHttpRequest()
            ajax.open("POST", "http://localhost:3000/siorg/adicionar")
            ajax.setRequestHeader('Content-type','application/json; charset=utf-8');
            ajax.send(json)
            window.location.reload()
        }
        else{
            alert("Preencha todos os campos")
            }

})