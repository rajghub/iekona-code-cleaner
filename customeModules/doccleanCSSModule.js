var purify = require("purify-css");
var CleanCSS = require('clean-css');

var exports = module.exports={};
exports.purifycssdoc = function(assets)
{

	return new Promise(function(resolve, reject) {
		var options = {minify: true, info: false};
		var finaloutput = [];
		var purifycount = 0; 
		
		
		function formatBytes(a,b){
			if(0==a)return"0 Bytes";
			var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
			return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f];
		}

		
		purifyCSSfun(assets.dataObj[purifycount]);
		
		
		function purifyCSSfun(docobj){
		
			
			if(purifycount >= assets.dataObj.length){
				resolve({finalDoccss:finaloutput})
			  }else{
				  
				  try{
			  
						purify(docobj.content, docobj.documentCSS, options, function (purifiedAndMinifiedResult) {
					
						  
							new CleanCSS({   format: {breaks: {afterRuleEnds: true}},
								level: {
								1: {removeEmpty: true}, 
								2: { 
									  mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
									  mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
									  mergeMedia: true, // controls `@media` merging; defaults to true
									  mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
									  mergeSemantically: true, // controls semantic merging; defaults to false
									  overrideProperties: true, // controls property overriding based on understandability; defaults to true
									  removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
									  reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
									  removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
									  removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
									  removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
									  removeUnusedAtRules: true, // controls unused at rule removing; defaults to false (available since 4.1.0)
									  restructureRules: true, // controls rule restructuring; defaults to false
								  }
							}
							
							}).minify(purifiedAndMinifiedResult, function (error, output) {
								finaloutput.push({path:assets.dataObj[purifycount].path, minify:output.styles, initialBytes:formatBytes(docobj.documentCSS) , finalbytes:formatBytes(output.styles)})
								purifycount++;
								purifyCSSfun(assets.dataObj[purifycount] ? assets.dataObj[purifycount] : "")
							});
							

						});
				  }catch(e){
					  console.log("===================="+e)
						var errorObj = {reason:e.reason,filename:assets.dataObj[purifycount].path,lineNumber:e.line, columnat:e.column};
						finaloutput.push({path:assets.dataObj[purifycount].path, minify:null,error:errorObj, initialBytes:formatBytes(docobj.documentCSS) , finalbytes:0 })
						purifycount++;
						purifyCSSfun(assets.dataObj[purifycount] ? assets.dataObj[purifycount] : "")
				  }
			
			
			}
		}
	})

}