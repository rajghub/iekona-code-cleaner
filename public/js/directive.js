var app = angular.module('cleanupApp');


//select menu 
app.directive("copyToClipBoard", function() {
    return {
        restrict: 'A',
		scope: {textArea: '@fortextarea'},
        link: function(scope, elt, attrs) {
            elt.on("click", function(e) {
                document.getElementById(scope.textArea).select();
				document.execCommand("copy");
            })
        }
    }
})


