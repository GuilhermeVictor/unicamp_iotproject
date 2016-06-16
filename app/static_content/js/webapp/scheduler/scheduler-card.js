
function initCommandControls() {
	
	$('.btn-do-command').click(function () {
		var command = $(this).attr('data-command');
		
		var data = {};
		data.command = command;			
		
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
				console.log('ok');
			}
		});
	});
	
	$('.btn-schedule-command').click(function () {
		var command = $(this).attr('data-command');
		
		var modal = $(this).attr('data-modal-target-id');
		
		var $modal = $('#' + modal);
		
		$modal.modal('show');
		
		$($modal).find('.schedule-command-btn-day').removeClass('btn-danger');
		
		
		$modal.find('.schedule-command-btn-day').unbind('click');
		$modal.find('.schedule-command-btn-day').click(function (e) {
			e.preventDefault();
			
			var $hidden = $(this).find('.schedule-command-day');
			
			if ($($hidden).val() == 'true') {
				$($hidden).val('false');
				$(this).removeClass('btn-danger');
			}
			else {
				$($hidden).val('true');
				$(this).addClass('btn-danger');
			}
		});
		
		$modal.find('.btn-schedule-command').unbind('click');
		$modal.find('.btn-schedule-command').click(function (e) {
			e.preventDefault();
		
			var data = {};
						
			var command = $(this).attr('data-command');			
			data.command = command;
			
			data.repeat = new Array();
			$($modal).find('.schedule-command-day').each(function () {
				
				var day = {};
				
				day.name = $(this).attr('data-day');
				day.checked = $(this).val() == 'true';
				
				data.repeat.push(day);							
			});
			
			console.log(data);			
			return;
			$.ajax({
				type: 'POST',
				url: '/schedulecommand',
				async: false,
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(data),
				error: function(err) {
					console.log(err);
					//TODO alert
				},
				success: function (data) {
					console.log('ok');
				}
			});
			
		});
	});
	
};