
$(document).ready(function () {
	
	new SportCard($('.sport-card'), 'off', 'soccer');		
	
	$('.light-card').each(function () {
		new LightCard($(this));		
	});
	
	initCommandControls();
	
});


$(function () {
	$('.datetimepicker').datetimepicker({
        locale:  'pt-br',
		inline: true,
		format: 'LT',
		//sideBySide: true,
		icons: {
			time: "icon-time icon-2x",
			date: "icon-calendar icon-2x",
			up: "icon-angle-up icon-4x",
			down: "icon-angle-down icon-4x"
		},
		defaultDate: new Date(moment())
    });
});