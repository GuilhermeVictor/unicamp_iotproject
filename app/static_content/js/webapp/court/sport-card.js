function SportCard($el, status, sport) {
	
	this.$el = $el;
	this.$a = this.$el.find('.btn-change-sport');		
	this.$btn = this.$el.find('.turnonoff-court');
	this.$btn_face = this.$el.find('.facebook-post');	
	
	this.courtStatus = {
		on : {
			btn_display: 'Desligar quadra',
			name: 'on',
		},
		off : {
			btn_display: 'Ligar quadra',
			name: 'off',
			a_class: 'gray'
		},
	};
	
	this.sports = {
		tennis: {
			display: 'Tênis',
			name: 'tennis',
			a_class: 'red',			
			btn_class: 'btn-danger',
			img: '/img/tennis_128.png'
		},
		bascketball: {
			display: 'Basquete',
			name: 'bascketball',
			a_class: 'orange',			
			btn_class: 'btn-warning',
			img: '/img/bascketball_128.png'
		},
		soccer: {
			display: 'Futebol',
			name: 'soccer',
			a_class: 'green',
			btn_class: 'btn-success',
			img: '/img/soccer_128.png'
		},
		volleyball: {
			display: 'Vôlei',
			name: 'volleyball',
			a_class: 'blue',
			btn_class: 'btn-primary',
			img: '/img/volleyball_128.png'
		}
	};	
		
	this.initEvents();

	this.setSport(sport);
	this.setCourtStatus(status);
}

SportCard.prototype = {
	initEvents: function () {
		
		//reference to 'this'
		var card = this;
		
		this.$a.click(function(e){
			e.preventDefault();
			
			var status = card.status;
			
			if (status.name == card.courtStatus.on.name) {
							
				var $modal = $('#change-sport-dialog');
				
				$modal.modal('show');
				$modal.find('.btn-change-sport').unbind('click');
				$modal.find('.btn-change-sport').click(function () {
					e.preventDefault();
									
					var data = {};
					data.sport = $(this).attr('data-sport');
									
					$.ajax({
						type: 'POST',
						url: '/changesport',
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
							card.setSport(data.sport);						
						}
					});
				});			
			}
		});
		
		this.$btn.click(function(e) {
			e.preventDefault();
			
			var status = card.status;
			
			var data = {};
			data.courtStatus = status.name;
							
			$.ajax({
				type: 'POST',
				url: '/courtlight',
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
					card.setCourtStatus(data.courtStatus);					
				}
			});
		});	

		this.$btn_face.click(function(){
			
			if(card.status.name == card.courtStatus.on.name){
								
				var $modal = $('#post-facebook-dialog');				
				$modal.modal('show');				
			}	

		});
	},
	
	updateSport: function() {
				
		var sport = this.sport;
			
		this.$a.find('img').attr('src', sport.img);
		this.$a.find('p').html(sport.display);
		this.$a.addClass(sport.a_class);
		this.$btn.addClass(sport.btn_class);
	},
	
	updateLight: function () {
					
		var sport = this.sport;
		var status = this.status;
		
		this.removeClasses();

		if (status.name == this.courtStatus.on.name) {			
			this.$btn.text(status.btn_display);
			this.$btn.addClass(sport.btn_class);			
			this.$a.addClass(sport.a_class);		
			
		} else {
			this.$btn.text(status.btn_display);
			this.$a.addClass(status.a_class);
			this.$btn_face.addClass(status.a_class);
		}		
	},
	
	setSport: function (sport) {
		this.removeClasses();
		
		this.$a.attr('data-sport', sport);
		
		if (sport == this.sports.tennis.name)
			this.sport = this.sports.tennis;
		
		else if (sport == this.sports.soccer.name)
			this.sport = this.sports.soccer;
		
		else if (sport == this.sports.bascketball.name)
			this.sport = this.sports.bascketball;
		
		else if (sport == this.sports.volleyball.name)
			this.sport = this.sports.volleyball;		
		
		this.updateSport();
	},
	
	setCourtStatus: function (status) {
		this.removeClasses();
		
		this.$btn.attr('data-status', status);
		
		if (status == this.courtStatus.on.name)
			this.status = this.courtStatus.on;
		else if (status == this.courtStatus.off.name)
			this.status = this.courtStatus.off;
		
		this.updateLight();
	},
	
	removeClasses: function () {
		var sport = this.sport;
		
		if (sport) {
			this.$a.removeClass(
				this.sport.a_class + ' ' + 			
				this.courtStatus.off.a_class
			);		
					
			this.$btn.removeClass(this.sport.btn_class);
			
			this.$btn_face.removeClass(this.courtStatus.off.a_class);
		}
	}
	
};

