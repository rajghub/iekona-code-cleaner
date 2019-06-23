var uncss = require('uncss');
var CleanCSS = require('clean-css');


module.exports = function(app) {


//custome module
var getURLModule = require('../customeModules/geturl.js');
var getCSSJSModule = require('../customeModules/requiredJSCSS.js');
var cleanCSSModule = require('../customeModules/cleanCSSModule.js');
var documentcleanCSSModule = require('../customeModules/doccleanCSSModule.js');

app.post('/websiteURLData', function(req, res){
console.log(req.body.url)
	
	getURLModule.getURL(req.body.url).then(function(result) {			
		//console.log(result.dataObj)
		//console.log(result.internalPages)
		getCSSJSModule.getCSSJScontent(result).then(function(reqresult) {	
			//console.log(reqresult)
			cleanCSSModule.purifycss(reqresult).then(function(finalresult) {
				//console.log(finalresult)				
				documentcleanCSSModule.purifycssdoc(result).then(function(doccssresult) {
					//console.log(doccssresult)
					console.log("done")
					res.json({css:finalresult, docCSS:doccssresult,data:result})
				})
			})
		})
	})
	
});




//http://www.domainregister.com/comorg.html

//http://traumon-pl-stg.indegene.com/
//http://atopia-dev.indegene.com/ 
//http://traumon-pl-stg.indegene.com/pl-pl/materialy-do-pobrania
//http://astmaochallergilinjen-dev.indegene.com/sv-se/
//http://www.astmaochallergilinjen.se/




}


