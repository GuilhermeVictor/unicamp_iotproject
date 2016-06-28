
function LightCard($el) {
	this.$el = $el;
	this.$a = this.$el.find('.btn-toogle-light');
	this.$btn = this.$el.find('.turnonoff-light');
	this.$img = this.$el.find('.light-img');
	
	this.lightStatus = {
		on : {
			btn_display: '<span class="icon-lightbulb "/> Desligar',
			name: 'on',			
			action: 'off'
		},
		off : {
			btn_display: '<span class="icon-lightbulb "/> Ligar',
			name: 'off',
			a_class: 'gray',
			action: 'on'
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
	this.setRoom(room);	
	this.setLightStatus(this.lightStatus.off.name);
	
	this.initEvents();
}

LightCard.prototype = {	

	initEvents: function () {
		//reference to 'this'
		var card = this;		
		
		this.$el.find('.light-card-action').click(function(e) {
			e.preventDefault();					
			
			var data = {};
			data.lightStatus = card.status.action;
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
					card.setLightStatus(data.lightStatus);
				}
			});
		});				
	},
	
	setLightStatus: function (status) {		
		this.removeClasses();
	
		this.$btn.attr('data-status', status);
		
		if (status == this.lightStatus.on.name)
			this.status = this.lightStatus.on;
		else
			this.status = this.lightStatus.off;
		
		this.update();
	},
	
	update: function () {
		if (this.status) {
			if (this.status.name == this.lightStatus.on.name) {
				this.$btn.html(this.lightStatus.on.btn_display);

				this.$a.addClass(this.room.a_class);
				this.$btn.addClass(this.room.btn_class);
				
				this.$img.attr('src', this.room.img_on);
				
			} else {
				this.$btn.html(this.lightStatus.off.btn_display);
				this.$a.addClass(this.lightStatus.off.a_class);
				
				this.$img.attr('src', this.room.img_off);
			}
		}
	},
	
	removeClasses: function () {
		
		if (this.room) {
			this.$a.removeClass(
				this.room.a_class + ' ' +
				this.lightStatus.off.a_class
			);		
					
			this.$btn.removeClass(this.room.btn_class);
		}
	},

	setRoom: function (room) {
		
		this.removeClasses();
		
		if (room == this.rooms.kitchen.name)
			this.room = this.rooms.kitchen;
		else if (room == this.rooms.bedroom.name)
			this.room = this.rooms.bedroom;
		else if (room == this.rooms.living_room.name)
			this.room = this.rooms.living_room;
		else if (room == this.rooms.outside.name)
			this.room = this.rooms.outside;
		
		this.update();
	}
};

