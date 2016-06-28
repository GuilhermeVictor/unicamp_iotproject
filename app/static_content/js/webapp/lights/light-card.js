
function LightCard($el) {
	this.$el = $el;
	
	this.lightStatus = {
		on : {
			btn_display: 'Desligar',
			name: 'on',
		},
		off : {
			btn_display: 'Ligar',
			name: 'off',
			a_class: 'gray'
		},
	};
	
	this.rooms = {
		kitchen: {			
			name: 'kitchen',
			a_class: 'yellow',			
			btn_class: 'btn-warning',
			img_on: '/img/Dish-128.png',
			img_off: '/img/Dish-gray-128.png'
		},
		bedroom: {			
			name: 'bedroom',
			a_class: 'blue',			
			btn_class: 'btn-primary',
			img_on: '/img/bedroom-128.png',
			img_off: '/img/bedroom-gray-128.png'
		},
		living_room: {			
			name: 'living_room',
			a_class: 'red',
			btn_class: 'btn-danger',
			img_on: '/img/livingroom-128.png',
			img_off: '/img/livingroom-gray-128.png'
		},
		outside: {
			name: 'outside',			
			a_class: 'green',
			btn_class: 'btn-success',
			img_on: '/img/outside-128.png',
			img_off: '/img/outside-gray-128.png'
		}
	};	
	
	var room = $el.attr('data-room');
	
	if (room == this.rooms.kitchen.name)
		this.room = this.rooms.kitchen;
	else if (room == this.rooms.bedroom.name)
		this.room = this.rooms.bedroom;
	else if (room == this.rooms.living_room.name)
		this.room = this.rooms.living_room;
	else if (room == this.rooms.outside.name)
		this.room = this.rooms.outside;
	
	var card = this;		
	
	this.$el.find('.turnonoff-light').click(function(e) {
		e.preventDefault();
		
		var status = $(this).attr('data-status');
		
		var data = {};
		data.courtStatus = status;
		data.room = card.room.name;		
		
		$.ajax({
			type: 'POST',
			url: '/roomlight',
			async: true,
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
				card.setLightStatus(data.LightStatus);				
				card.updateLight();				
			},
			complete: function () {
				card.setLightStatus('on');
				card.updateLight();				
			}
		});
	});			
}

LightCard.prototype = {	
	
	setLightStatus: function (status) {
		var $btn = this.$el.find('.turnonoff-light');
		
		$btn.attr('data-status', status);
	},
	
	updateLight: function () {
		var $a = this.$el.find('.btn-toogle-light');
		var $btn = this.$el.find('.turnonoff-light');
		var $img = this.$el.find('.light-img');
		
		var status = $btn.attr('data-status');
		
		this.removeClasses($a, $btn);

		if (status == this.lightStatus.on.name) {
			$btn.text(this.lightStatus.on.btn_display);

			$a.addClass(this.room.a_class);
			$btn.addClass(this.room.btn_class);
			
			$img.attr('src', this.room.img_on);
			
		} else {
			$btn.text(this.lightStatus.off.btn_display);
			$a.addClass(this.lightStatus.off.a_class);
			
			$img.attr('src', this.room.img_off);
		}		
	},
	
	removeClasses: function ($a, $btn) {
		
		$a.removeClass(
			this.room.a_class + ' ' + 			
			this.lightStatus.off.a_class
		);		
				
		$btn.removeClass(this.room.btn_class);
	}

	
};

