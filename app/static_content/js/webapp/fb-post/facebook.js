
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
			$('.modal').modal('hide');
			
			$.ajax({
				type: 'POST',
				url: '/post',
				async: false,
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(data),
				error: function(err) {
					var response = JSON.parse(JSON.parse(err.responseText));
					console.log(response);
					bootbox.alert(response.message);
				},
				success: function () {
					bootbox.alert('Seu comentário foi postado na sua linha do tempo');					
				},
				complete: function () {
					$("#postMessage").val('');
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