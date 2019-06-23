var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var path = require('path');
var joinpath = require('join-path');


var Parenturl;
var internalPageURL = [];
var externalPageURL = [];
var extOBJ = []
var allCSSfiles = [];
var allJSfiles = [];
var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;


var layerURL  = [];

var urloptions = {
  url: '',
  headers: {
    'User-Agent': 'request'
  }
};


var exports = module.exports={};
exports.getURL = function(coreurl)
{


			return new Promise(function(resolve, reject) {	
			
				var url_parts = url.parse(coreurl, true);
				Parenturl = url_parts.protocol+"//"+url_parts.host;
				//console.log(Parenturl)
				
				//Parenturl = "http://traumon-pl-stg.indegene.com/";
				//Parenturl = "http://localhost/folderstructure/";
				internalPageURL.push(Parenturl)
				 pageSection(internalPageURL)
				 
				 
				function pageSection(secURL){
				
				
					layerURL = [];
					generateUniqueURL(secURL).then(function(dynamicResult) {
			
						if(dynamicResult.resObj.length){
							pageSection(dynamicResult.resObj)
						}else{			
						
						
						var extOBJ = []
						
						innercontent(internalPageURL[0]);
						var pagecontentCount = 0;
						
						function innercontent(Uurl){
							

								request(Uurl, function(err, resp, body){
									
								if(typeof body === "undefined"){
									innercontent(Uurl)
								}else{
									
									var $ = cheerio.load(body);
									
									
									//document level css					  
									  var docCSS = "";
										$("style").each(function(i, docf){
											docCSS = docCSS + docf.firstChild.data;
										})
									//document level css
									
									//document level JS
									var docJS = "";
									$("script").each(function(i, docJSfile){
										if(!$(docJSfile).attr("src")){
											docJS = docJS + docJSfile.firstChild.data;
										}
									})
									//document level JS
									
									pagecontentCount++;
									
									if(pagecontentCount >= internalPageURL.length){
										resolve({internalPages:internalPageURL, externalpages:externalPageURL,cssfiles:allCSSfiles,allJSfile:allJSfiles,dataObj:extOBJ});
									}else {
										innercontent(internalPageURL[pagecontentCount])	
									}
									
									extOBJ.push({path:Uurl,content:$("body").toString(), documentCSS:docCSS, documentJS:docJS})
									
									
								}
									
								})
							
						
						}
						
						
						
						
								
							
						}
					})
				}
			
			})
		
		

	
	
	function generateUniqueURL(urlsArr){
	

		return new Promise(function(resolve, reject) {	
		
			var slice_arr = urlsArr.slice();
			var innercount = 0;
			layerURL = [];
			inner(slice_arr[0])
			
			
			function inner(url_Arr){
		console.log(url_Arr)

					urloptions.url= url_Arr;
					
					request(urloptions, function(err, resp, body){
						
						if(typeof body === "undefined"){
							inner(url_Arr)
						}else{
						
					  var $ = cheerio.load(body);
					  links = $('a'); 
					  var urlArr = [];
					 
					  
					 //get "a" tag
					  $(links).each(function(i, link){
						  
						  var gen_link = $(link).attr('href');
						  
						  
						  if(gen_link !== "#" && gen_link !== undefined && gen_link !== "" && gen_link.split(":")[0] !== "tel" && gen_link.split(":")[0] !== "mailto" && !regexp.test(gen_link) && gen_link.split(":")[0] !== "javascript"){
								
							  if(gen_link.split(".")[1] !== "pdf" && gen_link.split(".")[1] !== "png" && gen_link.split(".")[1] !== "gif" && gen_link.split(".")[1] !== "jpg" && gen_link.split(".")[1] !== "jpeg"){	
								//console.log(path.join( Parenturl, $(link).attr('href') ))			
									urlArr.push(joinpath( Parenturl, $(link).attr('href') ));
								}
						  }
						  
						  
						  //external links
						  if(regexp.test(gen_link)){
						  
							 //get unique external URL
							  externalPageURL.forEach(function(item, pos){
								if(externalPageURL.indexOf($(link).attr('href')) == -1){
									externalPageURL.push($(link).attr('href'))
								}
							  });
							  
							  if(!externalPageURL.length){
								externalPageURL.push($(link).attr('href'))
							  }
						  }

					  });
					  
					  
					

					  
					  
					var filteredURL = urlArr.filter(function(item, pos){
						return urlArr.indexOf(item)== pos; 
					});
					  
					 
						
	
						
					 
					  //get unique internal URL start
						filteredURL.forEach(function(item1, pos1){
							if(internalPageURL.indexOf(item1) == -1){
								internalPageURL.push(item1);
								layerURL.push(item1)
							}
						})
		
					  
					  
					  if(!internalPageURL.length){
						internalPageURL = filteredURL;
						layerURL = filteredURL;
					  }
					  //get unique internal URL end
					  
					  
					  
					  
					  //get unique css start
					  
						$("link").each(function(i, cssfile){
						
							if($(cssfile).attr("href")){		
							
								if(regexp.test($(cssfile)) )
								var cpath = $(cssfile).prop('href');
								else
								var cpath = joinpath( Parenturl, $(cssfile).prop('href')  )
								


								if(allCSSfiles.indexOf(cpath) == -1 && cpath.indexOf(".css") !== -1 ){								
									  allCSSfiles.push(cpath);
								}
							}			
						})
					  //get unique css end
					  
					  
					   var docCSS = "";
						$("style").each(function(i, docf){
							docCSS = docCSS + docf.firstChild.data;
						})
											  
					  
					  //get unique JS start
					  
						$("script").each(function(i, jsfile){
							if($(jsfile).attr("src")){	
	
							
								if(regexp.test($(jsfile)))
								var jspath = $(jsfile).prop('src');
								else
								var jspath = joinpath(Parenturl, $(jsfile).prop('src'));
								
								
								if(allJSfiles.indexOf(jspath) == -1 && jspath.indexOf(".js") !== -1){
									allJSfiles.push(jspath);
								}
							}		

								
						})
						
						
					  //get unique JS end
					  
						innercount++;
						if(innercount >= slice_arr.length){
							resolve({resObj:layerURL});	
						}else {
							 inner(slice_arr[innercount]) 
						}
						
						/*if(slice_arr.length >= i+1){
							setTimeout(function(){
								resolve({resObj:layerURL});
							},(Math.floor(slice_arr.length)/2 * 1000))
						}*/
						
					  
					 if (!err && resp.statusCode == 200) {
						//console.log("Print the response status code if a response was received")
						
					 }else{
						console.log(err)
					 }
					 
					 
						}
					  
							
					});
					
					
					
				}// inner
				
				
			});
	}
	
	
	
	
	
	
		
};		





