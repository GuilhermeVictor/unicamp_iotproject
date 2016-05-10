$(document).ready(function () {

	var dialog = $('#sport-card-dialog')[0];	
	dialogPolyfill.registerDialog(dialog);
	
	$('#sport-card-dialog-open').click(function () {
		dialog.showModal();
	});
	
	$('#sport-card-dialog-close').click(function () {
		dialog.close();
	});
});