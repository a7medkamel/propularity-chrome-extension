({
    appDir 							: "../data/common"
  , baseUrl 						: "./"
  , dir 								: "./build"
  , namespace 					: "propularity"
  , mainConfigFile 			: "./app/require.config.js"
  , modules 						: [
        {
        		name 				: "microformat"
        	, include 		: [ "libs/require", "app/startup", "app/app", "app/handlers/microformat/1" ]
        	, create 			: true
  				, optimize		: "uglify2"
      	}
    ]
})