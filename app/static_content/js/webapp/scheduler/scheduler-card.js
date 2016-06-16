
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
					
		$modal.find('.btn-schedule-command').attr('data-command', command);
		
		$modal.find('.schedule-command-btn-day').removeClass('btn-danger');
				
		$modal.find('.schedule-command-btn-day').unbind('click');
		$modal.find('.schedule-command-btn-day').click(function (e) {
			e.preventDefault();
			
			var $hidden = $(this).find('.schedule-command-day');
			
			if ($hidden.val() == 'true') {
				$hidden.val('false');
				$(this).removeClass('btn-danger');
			}
			else {
				$hidden.val('true');
				$(this).addClass('btn-danger');
			}
		});
		
		$modal.find('.btn-schedule-command').unbind('click');
		$modal.find('.btn-schedule-command').click(function (e) {
			e.preventDefault();
		
			var data = {};
			data.isEnabled = true;
			data.isDeleted = false;
			
			// qual o comando que sera agendado
			var command = $(this).attr('data-command');			
			data.command = command;
			
			// dias da semana que o comando sera disparado
			data.hasRepeat = false;					
			
			data.repeat = new Array();
			$($modal).find('.schedule-command-day').each(function () {
				
				var day = {};
				
				day.name = $(this).attr('data-day');
				day.checked = $(this).val() == 'true';
				
				if (day.checked)
					data.hasRepeat = true;
				
				data.repeat.push(day);							
			});
			
			// data e hora do alarme			
			data.time = $(".datetimepicker").data('date');			
			var date = moment(moment().format('YYYY-MM-DD') + ' ' + data.time, 'YYYY-MM-DD HH:mm');
			
			// se nao configurou a repeticao de dias, e a hora ja passou, o alarme fica para amanha
			if (!data.hasRepeat) {
										
				if (moment().isAfter(moment(date.add(1, 'm')))) {
					//alarme fica para amanha
					date = date.add(1, 'day');
				}
			}
			
			data.date = date;
			
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
					console.log('Ok:');
					console.log(data);
				}
			});
			
		});
		
		$modal.modal('show');
	});
	
};