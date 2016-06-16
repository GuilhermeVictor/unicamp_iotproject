
function initCommandControls() {
	
	$('.btn-do-command').click(function () {
		var command = $(this).attr('data-command');
		
		var data = {};
		data.command = command;
		
		//TODO				
		
		$.ajax({
			type: 'POST',
			url: '/docommand',
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
				card.setCommand(data.command);
				card.updateCard();
			}
		});
	});
	
	$('.btn-schedule-command').click(function () {
		var command = $(this).attr('data-command');
		
		var modal = $(this).attr('data-modal-target-id');
		
		var $modal = $('#' + modal);
		
		$modal.modal('show');
		
		$modal.find('.btn-schedule-command').unbind('click');
		$modal.find('.btn-schedule-command').click(function () {
			e.preventDefault();
		
			var command = $(this).attr('data-command');
			
			//TODO
			
		});
	});
	
};