
$(document).ready(function () {
		
	$('#btnPost').click(function (e) {
		e.preventDefault();
		
		var data = {};
		
		data.message = $("#postMessage").val() + '';
		
		if (data.message == '') {
			
			$("#postMessage").parent().addClass('error');
			$("#postMessage").parent().find('span').removeClass('hidden');
		}
		else {
			$.ajax({
				type: 'POST',
				url: '/chanssgesport',
				async: false,
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(data),
				error: function(err) {
					console.log(err);
					//TODO alert
				},
				success: function (data) {
					data = jQuery.parseJSON(data);
					console.log(data);
					card.setSport(data.sport);
					card.updateSport();
				}
			});
		}
	});
	
	$("#postMessage").on('change keyup paste', function () {		
		var message = $(this).val() + '';
		
		if (message != '') {
			
			$(this).parent().removeClass('error');
			$(this).parent().find('span').addClass('hidden');
		}
	});
	
});