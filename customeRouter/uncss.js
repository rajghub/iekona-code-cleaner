var uncss = require('uncss');
var CleanCSS = require('clean-css');


module.exports = function(app) {

app.post('/getuncsscontent', function(req, res){

	
	options = {		
		ignore       : ['.fff'],
		raw          : req.body.css,
		timeout      : 1000,
		report       : false,
        banner       : false
	};
	 
	uncss(req.body.html, options, function (error, output) {

			new CleanCSS({   format: {breaks: {afterRuleEnds: true}},
				level: {
				1: {removeEmpty: true}, 
				2: { 
					  mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
					  mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
					  mergeMedia: true, // controls `@media` merging; defaults to true
					  mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
					  mergeSemantically: false, // controls semantic merging; defaults to false
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
			
			
			}).minify(output, function (error, output) {
			  console.log(output.styles)
			  res.json({ cleancss:output.styles })
			});
	
		
		
	});	

});


}


