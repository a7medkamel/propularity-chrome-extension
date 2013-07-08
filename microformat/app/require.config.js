requirejs.config({
    paths: {
        'app/conf'		: '../../microformat/app/conf'
      , 'app/startup'	: '../../microformat/app/startup'
    }
  , shim: {
      'libs/backbone': {
        	deps: ['libs/underscore', 'libs/jquery']
    	}
    , 'libs/jquery': {
					init: function(jq){
		        return window.jQuery;
		      }
    	}
  }
});