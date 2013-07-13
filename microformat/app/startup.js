define('app/startup', ['app/app', 'app/conf', 'app/style/css'], function(app, conf, css){

	function init(options) {
		options = options || {};

		conf.host = options.host || conf.host;

		css.load(conf.host + 'apps/css/');
		app.startup();
	}

	return {
			init : init
	};
});