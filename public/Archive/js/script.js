	var abc;
$(function(){				
	$('#select_link').click(function(e){
	
		e.preventDefault();

		var dataA = {};
		dataA.name = $("#name").val();
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(dataA),
			contentType: 'application/json',
			url: '/websiteURLData',						
			success: function(result) {
				console.log('success');
				console.log((result));
				abc = result;
				//$("#output").text("Hi "+data.name+" we got your name at "+data.date+"  time")
				result.data.internalPages.forEach(function(page,i){
					$(".interLinks").append("<p>"+(i+1)+". "+page +"</p>")
				})
				
				result.data.externalpages.forEach(function(page,i){
					$(".externalLinks").append("<p>"+(i+1)+". "+page +"</p>")
				})
				
				result.data.allJSfile.forEach(function(page,i){
					$(".jsFiles").append("<p>"+(i+1)+". "+page +"</p>")
				})
				
				
				
				result.css.finalcss.forEach(function(obj,i){
					$(".cssLinks").append("<h4>"+(i+1)+". "+obj.path +"</h4>")
					if(obj.minify == "" && obj.error == null){
						$(".cssLinks").append("<h4><b>No Document level CSS found or no unused CSS found</b></h4>")
					}else if(obj.minify == null){
						$(".cssLinks").append("<h5>"+JSON.stringify(obj.error)+"</h5>")
					}else{
						$(".cssLinks").append("<div><p>"+obj.initialBytes+"-"+ obj.finalbytes+"</p> <textarea>"+obj.minify+"</textarea> <button class='ctcb'>Copy To Clipboard</button></div>")
					}
				})
				
				result.docCSS.finalDoccss.forEach(function(obj,i){
					$(".doccssLinks").append("<h4>"+(i+1)+". "+obj.path +"</h4>")
					
					if(obj.minify == "" && obj.error == null){
						$(".doccssLinks").append("<h4><b>No Document level CSS found or no unused CSS found</b></h4>")
					}else if(obj.minify == null){
						$(".doccssLinks").append("<h5>"+JSON.stringify(obj.error)+"</h5>")
					}else{
						$(".doccssLinks").append("<div><p>"+obj.initialBytes+"-"+ obj.finalbytes+"</p> <textarea>"+obj.minify+"</textarea> <button class='ctcb'>Copy To Clipboard</button></div>")
					}
					
				})
				
				
				
			}
		});

	});				

	
	//copy to clip board
	
		$(document).on("click",".ctcb",function(){
			var textarea = $(this).siblings("textarea");
			$(textarea).select();
			document.execCommand("copy");
		})
	
	});
