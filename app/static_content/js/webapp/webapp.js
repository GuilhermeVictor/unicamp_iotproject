var card = undefined;

$(document).ready(function () {
	
	card = new SportCard($('.sport-card'));
		
	card.setCourtStatus(card.courtStatus.off.name);
	card.setSport(card.sports.soccer.name);
	
	card.updateSport();
	card.updateLight();
	
	
	
	
});


$(function () {
	$('.datetimepicker1').datetimepicker({
        locale:  'pt-br',
		inline: true,
		sideBySide: true
        
    });
});