var request = require('request');

var exports = module.exports={};
exports.getCSSJScontent = function(assets)
{
	//js assets.allJSfile
	//css assets.cssfiles
	
	var jscss  = [assets.cssfiles,assets.allJSfile];
	

	
	var cssFileContent = [];
	var JSFileContent = [];
	
	return new Promise(function(resolve, reject) {
		var groupcount = 0;
		getdata(jscss[groupcount])
		function getdata(sect){
		
			getJSCSScontent(sect).then(function(result) {	
				if(groupcount == 0)
					assets.cssFileContents = result;
				else
					assets.JSFileContents = result;

				groupcount++;
				if(groupcount >= jscss.length)
					resolve(assets);
				else
					getdata(jscss[groupcount]);
				
				

				
			})
		}
		
	})
	
	
	
	
	
		
		
		function getJSCSScontent(arr){

		
			return new Promise(function(resolve, reject) {
				var ccount = 0;
				var outputarr = [];
				inner(arr[ccount])
				function inner(url){
			
					if(ccount >= arr.length){
						resolve(outputarr);
					}else{
						request(url, function(err, resp, source){
							
							if(typeof source === "undefined"){
								inner(url)
							}else{
								
								outputarr.push({path:url,content:source})
								
								ccount++;
								inner(arr[ccount])
							}
						
						})
						
					}

				}
				
			})
		}
		
		

	

}