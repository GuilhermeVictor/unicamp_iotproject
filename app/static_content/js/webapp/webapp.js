var card = undefined;
var scard = undefined;

$(document).ready(function () {
	
	card = new SportCard($('.sport-card'));
		
	card.setCourtStatus(card.courtStatus.off.name);
	card.setSport(card.sports.soccer.name);
	
	card.updateSport();
	card.updateLight();
	
	
	initCommandControls();
	
	$.support.transition = false;
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