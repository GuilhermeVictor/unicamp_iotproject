
function TemplateBuilder(config, fs, mustache) {	
	this.fs = fs;
	this.mustache = mustache;
	this.config = config;
	
	this.blank = this.fs.readFileSync(config.appPath + '/views/layout/blank.mustache').toString();
	this.main = this.fs.readFileSync(config.appPath + '/views/layout/main.mustache').toString();
	this.header = this.fs.readFileSync(config.appPath + '/views/layout/header.mustache').toString();
	this.navbar = this.fs.readFileSync(config.appPath + '/views/layout/navbar.mustache').toString();	
	this.footer = this.fs.readFileSync(config.appPath + '/views/layout/footer.mustache').toString();	
	this.breadcumb = this.fs.readFileSync(config.appPath + '/views/layout/breadcumb.mustache').toString();	
}

TemplateBuilder.prototype = {
	
	view: function(viewPath, model) {

		var partials = {};
		
		model.appname = this.config.appname;
		
		var content = this.fs.readFileSync(viewPath);
		
		var html = this.mustache.render(this.main, model, {			
			header: this.header,			
			navbar: this.navbar,
			footer: this.footer,
			breadcumb: this.breadcumb,
			content: content.toString()
		});
		
		return html;
	},
	
	view_main: function (viewPath, model) {
		var content = this.fs.readFileSync(viewPath);
		
		var html = this.mustache.render(this.blank, model, {
			content: content.toString()
		});
		
		return html;
	}
};

module.exports = function (config, fs, mustache) {	
	return new TemplateBuilder(config, fs, mustache);
}