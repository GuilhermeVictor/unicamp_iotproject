function SportCard($el) {
	this.$el = $el;
	
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

	var card = this;
		
	this.$el.find('.btn-change-sport').click(function(e){
		e.preventDefault();
		
		var status = card.$el.find('.turnonoff-court').attr('data-status');
		
		if (status == card.courtStatus.on.name) {
						
			var $modal = $('#change-sport-dialog');
			
			$modal.modal('show');
			$modal.find('.btn-change-sport').unbind('click');
			$modal.find('.btn-change-sport').click(function () {
				e.preventDefault();
			
				var sport = $(this).attr('data-sport');
				
				var data = {};
				data.sport = sport;
								
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
						card.updateSport();
					}
				});
			});			
		}
	});
	
	this.$el.find('.turnonoff-court').click(function(e) {
		e.preventDefault();
		
		var status = $(this).attr('data-status');
		
		var data = {};
		data.courtStatus = status;
						
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
				card.updateLight();
			}
		});
	});	

	this.$el.find('.facebook-post').click(function(){
		
		var $interval = $('#post-facebook-dialog');
			
			$interval.modal('show');
			$('#fbpost').show();
			



	});

	
}

SportCard.prototype = {

	updateSport: function() {
		var $a = this.$el.find('.btn-change-sport');		
		var $btn = this.$el.find('.turnonoff-court');
		
		this.removeClasses($a, $btn);
		
		var sport = $a.attr('data-sport');
		
		if (sport == this.sports.tennis.name) {
			$a.find('img').attr('src', this.sports.tennis.img);
			$a.find('p').html(this.sports.tennis.display);
			$a.addClass(this.sports.tennis.a_class);
			$btn.addClass(this.sports.tennis.btn_class);
			
		} else if (sport == this.sports.bascketball.name) {
			$a.find('img').attr('src', this.sports.bascketball.img);
			$a.find('p').html(this.sports.bascketball.display);
			$a.addClass(this.sports.bascketball.a_class);
			$btn.addClass(this.sports.bascketball.btn_class);
			
		} else if (sport == this.sports.volleyball.name) {
			$a.find('img').attr('src', this.sports.volleyball.img);
			$a.find('p').html(this.sports.volleyball.display);
			$a.addClass(this.sports.volleyball.a_class);
			$btn.addClass(this.sports.volleyball.btn_class);
			
		} else if (sport == this.sports.soccer.name) {
			$a.find('img').attr('src', this.sports.soccer.img);
			$a.find('p').html(this.sports.soccer.display);
			$a.addClass(this.sports.soccer.a_class);
			$btn.addClass(this.sports.soccer.btn_class);
		}
	},
	
	updateLight: function () {
		var $a = this.$el.find('.btn-change-sport');
		var $btn = this.$el.find('.turnonoff-court');
		
		var sport = $a.attr('data-sport');
		var status = $btn.attr('data-status');
		
		this.removeClasses($a, $btn);
		
		if (status == this.courtStatus.on.name) {
			$btn.text(this.courtStatus.on.btn_display);
			
			if (sport == this.sports.tennis.name) {
				$a.addClass(this.sports.tennis.a_class);
				$btn.addClass(this.sports.tennis.btn_class);
				
			} else if (sport == this.sports.bascketball.name) {
				$a.addClass(this.sports.bascketball.a_class);
				$btn.addClass(this.sports.bascketball.btn_class);
				
			} else if (sport == this.sports.volleyball.name) {
				$a.addClass(this.sports.volleyball.a_class);
				$btn.addClass(this.sports.volleyball.btn_class);
				
			} else if (sport == this.sports.soccer.name) {
				$a.addClass(this.sports.soccer.a_class);
				$btn.addClass(this.sports.soccer.btn_class);
			}
			
		} else {
			$btn.text(this.courtStatus.off.btn_display);
			$a.addClass(this.courtStatus.off.a_class);
		}		
	},
	
	setSport: function (sport) {
		this.$el.find('.btn-change-sport').attr('data-sport', sport);
	},
	
	setCourtStatus: function (status) {
		this.$el.find('.turnonoff-court').attr('data-status', status);			
	},
	
	removeClasses: function ($a, $btn) {
		
		$a.removeClass(
			this.sports.tennis.a_class + ' ' + 
			this.sports.soccer.a_class + ' ' + 
			this.sports.bascketball.a_class + ' ' + 
			this.sports.volleyball.a_class + ' ' +
			this.courtStatus.off.a_class
		);		
				
		$btn.removeClass(
			this.sports.tennis.btn_class + ' ' + 
			this.sports.soccer.btn_class + ' ' + 
			this.sports.bascketball.btn_class + ' ' + 
			this.sports.volleyball.btn_class
		);
	}
	
};

