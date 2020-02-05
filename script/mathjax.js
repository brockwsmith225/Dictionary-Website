function latexerize() {
	$(".math-jax").remove();
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.className = "math-jax"
	script.src = "vendor/mathjax/es5/tex-mml-chtml.js";   // use the location of your MathJax

	var config = 'MathJax.Hub.Config({' +
	           	'extensions: ["tex2jax.js"],' +
       			'jax: ["input/TeX", "output/HTML-CSS"],' +
      			'tex2jax: {' +
      			'inlineMath: [ ["$","$""], ["\\(","\\)"] ],' +
      			'displayMath: [ ["$$","$$""], ["\\[","\\]"] ],' +
      			'},' + 
       			'"HTML-CSS": { availableFonts: ["TeX"] }' +
	           	'});' +
	           	'MathJax.Hub.Startup.onload();';

	if (window.opera) {script.innerHTML = config}
	           else {script.text = config}
	
	document.getElementsByTagName("head")[0].appendChild(script);
}
