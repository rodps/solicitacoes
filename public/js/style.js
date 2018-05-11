$(document).ready(function() {
	// get current URL path and assign 'active' class
	var pathname = window.location.pathname;
	$('.nav-link[href="'+pathname+'"]').parent().addClass('active');
})

$("tr").click(function() {
        thisdata = $(this).attr('data-href');
        console.log(thisdata);
        window.location.href = thisdata;
});