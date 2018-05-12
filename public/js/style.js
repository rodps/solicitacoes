var orcamento = [];
var pathname = window.location.pathname;

$.getJSON( "/backend/solicitacoes/"+pathname.split('/')[2]+"/orcamentos", data => {
  $.each( data, function( key, val ) {
    orcamento.push( val );
  });
  console.log(orcamento);
})

$(document).ready(function() {
	// get current URL path and assign 'active' class
	var pathname = window.location.pathname;
	$('.nav-link[href="'+pathname+'"]').parent().addClass('active');
});

$(".tr-clickable").click(function() {
    thisdata = $(this).attr('data-href');
    window.location.href = thisdata;
});

$("#add-orcamento").click(function() {
	orcamento.push({
		cnpj_fornecedor: $("#cnpj").val(),
		nome_fornecedor: $("#nome").val(),
		valor: $("#valor").val(),
		origem: $("#ref").val()
	});
	console.log(orcamento);
	if (orcamento.length >= 5) {
		$(this).removeClass("btn-success");
		$(this).addClass("btn-disabled");
		$("fieldset").prop("disabled", true);
	}
	var tr = document.createElement('tr');
	$(tr).append("<td>" + $("#cnpj").val()  + "</td>");
	$(tr).append("<td>" + $("#nome").val()  + "</td>");
	$(tr).append("<td>" + $("#valor").val() + "</td>");
	$(tr).append("<td>" + $("#ref").val()   + "</td>");
	$(tr).append("<td>" + $("#pdf").val()   + "</td>");
	$(tr).append("<td><button class='btn btn-danger btn-sm delete-row' data-toggle='modal' data-target='#modal-delete'><i class='fas fa-trash-alt'></i></button></td>");
	$("tbody").append(tr);
});

$("tbody").on("click", ".delete-row", function() {
	var row_idx = $(this).parent().parent().index();
	$('#confirm-delete').data('idx', row_idx);
});

$('#confirm-delete').click(function(){
	var row_idx = $(this).data('idx');
	$('tbody tr').get(row_idx).remove();
	orcamento.splice(row_idx, 1);
	if (orcamento.length < 5) {
		$("#add-orcamento").addClass("btn-success");
		$("#add-orcamento").removeClass("btn-disabled");
		$("fieldset").prop("disabled", false);
	}
});

$('#save-orcamento').click(function(){
	var path = window.location.pathname;
	console.log(path);
	console.log(path.split('/')[2]);
	$.ajax({
        type: 'POST',
        url: '/solicitacoes/'+path.split('/')[2]+'/orcamentos',
        contentType: 'application/json',
        data: JSON.stringify(orcamento),
        success: function(data) {
            console.log("Successfully saved the matched beans to the user.");
        }
    }).done(function ( ) {
        console.log("OK");
    }).fail(function ( jqXHR, textStatus, errorThrown ) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });
});