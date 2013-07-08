require(['app/app', 'app/conf', 'app/style/css'], function(app, conf, css){
	app.startup();
	css.load(host + 'apps/css/');
});