define('app/conf', [], function(){
  return {
        namespace 					: 'propularity'
      , host      					: 'http://alpha.propularity.com/'
      , handlers 						: {
      		namespace 				: 'app/handlers/'
      	, context 					: '_'
      }
      , overlay   					: {
            id    : 'chrome-extension-overlay'
      }
      , modules             : {
          findAll : function() {
            return propularity_ns.require.s.contexts['_'].registry;
          }
      }
  };
});