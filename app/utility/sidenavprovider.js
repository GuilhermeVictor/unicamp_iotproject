
function Menu(display, name, icon, url) {
	this.display = display;
	this.name = name;
	this.icon = icon;
	this.url = url;
	
	this.active = false;
}

Menu.prototype = {
	setActive: function (active) {		
		this.active = active;
		return this;
	}	
};

function SidenavProvider(passport) {
	this.passport = passport;
}

function getSideNavMenu(page) {
	var menus = new Array();
	menus.push(new Menu('Início', 'home', 'bar-chart', '/').setActive(page == 'home'));
	//menus.push(new Menu('Agenda da quadra', 'calendar', 'calendar', '/calendar').setActive(page == 'calendar'));
	menus.push(new Menu('Comandos', 'time', 'time', '/scheduler').setActive(page == 'time'));
	
	return menus;
}
	
SidenavProvider.prototype = {	
	
	getBasePageModel: function (req, page, done) {	
		this.passport.deserializeUser(req.session.passport.user, function (err, user) {
			var model = {};
			
			model.username = user.getName();
			model.sidenav = getSideNavMenu(page);
			
			done(model);			
		});
	}

};

module.exports = function (passport) {	
	
	return new SidenavProvider(passport);
}